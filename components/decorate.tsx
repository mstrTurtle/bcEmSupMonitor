/// 裱在内容区中，状态展示区外的框框。
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Connecting from "./em-status/connecting"
import {Status,status} from "@/store/store"
import Hello from "./em-status/hello"

interface Wrap<T>{
    val:T
}


const showByStatus = (status:Status)=>{
    switch(status){
        case Status.Init: return <></>
    }
}

interface Props {
    status: { val: Status; }
}

const Header: React.FC<Props> = observer(({status})=>{
    return <div>
    <h1>Emulator运行中 状态为{status.val}</h1>
    </div>
})

const Nav: React.FC<Props> = observer(({ status }) => {
    return <div>
        {
            (() => {
                switch (status.val) {
                    case Status.Init:
                        return <>初始状态 正在连接到Sup服务器。<Hello></Hello></>
                    case Status.Connected:
                        return <>连接成功 Sup还没开始运行</>
                    case Status.ConnectionFailed:
                        return <>连接失败。请关闭重启。</>
                    case Status.Running:
                        return <>正在运行中，进度为：</>
                    case Status.RunningFailed:
                        return <>运行失败，请关闭重启。</>
                    case Status.Completed:
                        return <>已完成，报告准备好了，点击查看报告。</>
                    case Status.Disconnected:
                        return <>已退出</>
                    default:
                        return <></>
                }
            })()
        }
    </div>
})


const dec = ()=>{
    return <>
    <Header status={status}></Header>
    
    </>
}


export default dec