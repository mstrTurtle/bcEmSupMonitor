'use client'

import { Status, progress, status } from "@/store/store";
import { report } from "@/store/store";
import { runInAction } from "mobx";
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
export class Receiver {
    fsm: StateMachine;

    constructor() {
        this.fsm = new StateMachine()
    }

    // deprecated, RxJS太难用了。
    async retryTillConnect():Promise<Subject<Msg>> { // 尝试连接
        console.log("in retryTillConnect")

        for(;;) {
            try {
                console.log("creating websocket")
                const openEvents = new Subject<Event>();
                const ws:Subject<Msg> = webSocket({
                    url: 'ws://localhost:7697', 
                    // openObserver: openEvents 
                });
                
                console.log("now racing for open")
                return ws
                // var res = await Promise.race([firstValueFrom(openEvents.asObservable()),firstValueFrom(timer(5000))])
                var res = firstValueFrom(openEvents)
                console.log("after await open")
                console.log(res)
                if (typeof res == "number"){
                    console.log("timeout, continue")
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

    // deprecated, RxJS太难用了
    async receiveMsgLoop(sub:Subject<Msg>) { // 负责消息部分。
        const ws = sub.asObservable()
        console.log("in receiveMsgLoop")
        let hs = ws.pipe( // 把心跳分离出来。
        filter((v:Msg)=>v.type=="heartbeat")
        )
        let ms = ws.pipe( // 把分离出来。
            filter((v:Msg)=>v.type!="heartbeat")
    )
        for (;;){
            try {
                console.log("before receive msg")
                var m = await firstValueFrom(ms)
                console.log("after receive msg,before fsm.next")
                this.fsm.next(m) // 平时通过节点来。
            } catch (error) { // 特殊情况直接一个任意出发的飞线的转移。
                console.log("ERR happened: ",error)
                this.fsm.toFailed()
                return
            }
            if (m.type=='bye') return
        }
        
    }

    // Start the retry loop and message receiving loop
    async start() {
        console.log("in start")
        // const ws = await this.retryTillConnect();
        // await this.receiveMsgLoop(ws);
        const ws = new WebSocket("ws://localhost:7697/api/status")
        ws.onopen=(ev)=>{
            console.log("opened")
            ws.onmessage=(ev)=>{
                this.fsm.next(JSON.parse(ev.data))
            }
        }
        ws.onerror=(ev)=>{
            console.log("error happened")
            console.log(ev)
            this.fsm.toFailed()
        }
    }
}

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
        runInAction(() => {
            status.val = Status.Init
            // progress.val = {count:0, total:0}
        })
        return this.connecting
    }
    connecting(m:Msg):StateT{
        console.log("there is connecting. the m is:")
        console.log(m)
        console.log(`the m.type is ${m['type']}`)
        if(m.type=='hello'){
            runInAction(() => {
                status.val = Status.Connected
            })
            return this.connected
        }
        else{
            throw Error()
        }
            
    }
    connected(m:Msg):StateT{
        if(m.type=='started'){
            runInAction(() => {
                status.val = Status.Started
                // progress.val = m.content
            })
            return this.computing
        }
        else{
            throw Error()
        }
        
    }
    computing(m:Msg):StateT{
        if(m.type=='computing'){
            runInAction(() => {
                status.val = Status.Running
                progress.val = m.content
            })
            return this.computing
        }
        else if(m.type == 'completed'){
            runInAction(() => {
                status.val = Status.Completed
                report.val = m.content
            })
                return this.completed
        }
        else{
            throw Error()
        }
        
    }
    completed(m:Msg):StateT{ // 已经完成，没有出边了。
        if(m.type=='bye'){
            return this.completed
        }
        else{
            throw Error()
        }
    }
    failed(m:Msg):StateT{ // 没有出边，不要调用。
        throw Error()
    }
    // 以上都是状态。。。

    toFailed(){ // 一个连边，捷径。
        runInAction(()=>{
            status.val = Status.Disconnected
        })
        this.state = this.failed
    }

    next(msg:Msg){ // 这是转移用的。输入就是事件。
        console.log(`FSM got Msg: ${msg}`)
        console.log(msg)
        console.log("FSM state before:")
        console.log(this.state)
        try{

            this.state = this.state(msg)
        }catch(e){
            console.log("FSM run into error catched:")
            console.log(e)
        }
        console.log("FSM state after:")
        console.log(this.state)
    }
}
