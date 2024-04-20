'use client'

import { Status, progress, status } from "@/store/store";
import { report } from "@/store/store";
import { Observable, Subject, filter, firstValueFrom, fromEvent, timer } from "rxjs";
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
const peer_server_addr = '127.0.0.1:8889';

interface Msg{
    type: string,
    content:any,
}

function NotImplementedError(this: any, message = "") {
    this.name = "NotImplementedError";
    this.message = message;
}

NotImplementedError.prototype = Error.prototype;

// Receiver持有一个Websocket和一个带有动作的状态机fsm。状态机的动作就是改变对应的UI状态。
class Receiver {
    fsm: StateMachine;

    constructor() {
        this.fsm = new StateMachine()
    }
    async retryTillConnect():Promise<Subject<Msg>> { // 尝试连接

        const openEvents = new Subject<Event>();
        const ws:Subject<Msg> = webSocket({
            url: 'ws://…', 
            openObserver: openEvents 
        });
        for(;;) {
            try {
                var res = await Promise.race([firstValueFrom(openEvents),firstValueFrom(timer(5000))])
                if (typeof res == "number"){
                    continue
                }
                console.log('Connected to peer server.');
                return ws
            } catch (error) {
                console.error('Connection failed');
                this.fsm.toFailed()
            }
        }
    }

    async receiveMsgLoop(ws:Subject<Msg>) { // 负责消息部分。
        let hs = ws.pipe( // 把心跳分离出来。
        filter((v:Msg)=>v.type=="heartbeat")
        )
        let ms = ws.pipe( // 把分离出来。
            filter((v:Msg)=>v.type!="heartbeat")
    )
        for (;;){
            try {
            var m = await firstValueFrom(ms)
            this.fsm.next(m) // 平时通过节点来。
            } catch (error) { // 特殊情况直接一个任意出发的飞线的转移。
                this.fsm.toFailed()
                return
            }
            if (m.type=='bye') return
        }
        
    }

    // Start the retry loop and message receiving loop
    async start() {
        const ws = await this.retryTillConnect();
        await this.receiveMsgLoop(ws);
    }
}

const rv = new Receiver()
rv.start().then(()=>{
    console.log('Receiver Exit.')
}); // Start the process

var MsgNoUse:Msg = {type: 'no_use', content: null}


type StateT = (m:Msg) => (StateT) // 无穷递归类型只能先定义一下。

// 方法就是状态，switch就是不同转移。方法返回值就是新状态。
// 这是实现状态机的一种技巧。
class StateMachine{
    state : StateT; // 这类型嵌套。。。像个Monad（-_-||）
    constructor(){
        this.state = this.init
        this.next(MsgNoUse)
    }
    // 状态。。。。
    init(m:Msg) : StateT{
        status.val = Status.Init
        return this.connecting
    }
    connecting(m:Msg):StateT{
        if(m.type=='hello'){
            status.val = Status.Connected
            return this.completed
        }
        else{
            throw Error()
        }
            
    }
    connected(m:Msg):StateT{
        if(m.type=='started'){
            status.val = Status.Running
            progress.val = m.content
            return this.computing
        }
        else{
            throw Error()
        }
        
    }
    computing(m:Msg):StateT{
        if(m.type=='computing'){
            progress.val = m.content
            return this.computing
        }
        else if(m.type == 'done'){
            status.val = Status.Completed
            report.val = m.content
            return this.completed
        }
        else{
            throw Error()
        }
        
    }
    completed(m:Msg):StateT{ // 已经完成，没有出边了。
        throw Error()
    }
    failed(m:Msg):StateT{ // 没有出边，不要调用。
        throw Error()
    }
    // 以上都是状态。。。

    toFailed(){ // 一个连边，捷径。
        this.state = this.failed
    }

    next(msg:Msg){ // 这是转移用的。输入就是事件。
        this.state = this.state(msg)
    }
}
