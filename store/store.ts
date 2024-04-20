import { makeAutoObservable } from "mobx";
import { Re } from "@/components/em-status/report";


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
    val: {
        count:0,
        total:0,
    }
})

const report = makeAutoObservable<{val:Re|null}>({
    val :null
})

export  {Status,status,progress,report}