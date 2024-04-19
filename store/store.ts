import { makeAutoObservable } from "mobx";


enum Status{
    Init,
    Connected,
    ConnectionFailed,
    Running,
    RunningFailed,
    Completed,
    Disconnected,
}

const status = makeAutoObservable({
    val: Status.Init,
})

const progress = makeAutoObservable({
    val: 0
})

export  {Status,status,progress}