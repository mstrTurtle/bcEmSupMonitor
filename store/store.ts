import { makeAutoObservable } from "mobx";
import { Re } from "@/components/em-status/report";


enum Status{
    Init,
    Connected,
    ConnectionFailed,
    Started,
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

const report = makeAutoObservable<{val:Re}>({
    val :{
        pbftShardCsv: [],
        measureOutputs: [],
    }
    
})

export  {Status,status,progress,report}