'use client'

import { Status, status } from "@/store/store";
import { fromEvent } from "rxjs";
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
const peer_server_addr = '127.0.0.1:8889';


interface Hello{}
interface Bye{}

interface Msg{
    type: string,
    content:any,
}
// ts没办法根据类型派发，也就是没有函数重载。同时也没别的办法静态派发。所以只能这样了。
function handleHello(m:Hello){
    status.val = Status.Connected
}

function handleBye(m:Bye){
    
}

function NotImplementedError(this: any, message = "") {
    this.name = "NotImplementedError";
    this.message = message;
}

NotImplementedError.prototype = Error.prototype;

class Receiver {
    ws: WebSocketSubject<Msg> | null;
    constructor() {
        this.ws = null;
    }
    async retryTillConnect() {
        let connected = false;
        while (!connected) {
            try {
                this.ws = webSocket(`ws://${peer_server_addr}`);
                connected = true;
                console.log('Connected to peer server.');
            } catch (error) {
                console.error('Connection failed. Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }

    async receiveMsgLoop() {
        if (this.ws == null) {
            return
        }
        this.ws.subscribe((msg) => {
            try {
                this.dispatchMsg(msg); // 不要await，让处理器自己跑
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        })
    }

    dispatchMsg(msg: Msg) {
        switch (msg.type) {
            case "hello":
                handleHello(msg.content as Hello) // TODO: ES-Lint 开一下禁止any implicit转换。
            case "bye":
                handleBye(msg.content as Bye)
        }
    }

    // Start the retry loop and message receiving loop
    async start() {
        await this.retryTillConnect();
        await this.receiveMsgLoop();
    }
}

const rv = new Receiver()
rv.start().then(()=>{
    console.log('Receiver Exit.')
}); // Start the process

