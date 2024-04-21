/// 裱在内容区中，状态展示区外的框框。
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Connecting from "./em-status/connecting"
import {Status,progress,status} from "@/store/store"
import Hello from "./em-status/hello"
import { Button } from "antd"
import { Receiver } from "./sup_monitor"
import Link from "next/link"

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
        
        <Button onClick={() => {
            console.log("start the receiver")
            const rv = new Receiver()
            rv.start().then(() => {
                console.log('Receiver Exit.')
            })
        }} type={"primary"} size='large'>
            {(status.val==Status.Init)?"点这里开始计算":(status.val==Status.Completed)?"计算已完成，点击重新运算":"计算中"}
        </Button>
    <h1>Emulator运行中 状态为{Status[status.val]}</h1>
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
                        return <>正在运行中，进度为：{`${JSON.stringify(progress.val)}`}</>
                    case Status.RunningFailed:
                        return <>运行失败，请关闭重启。</>
                    case Status.Completed:
                        return <>已完成，报告准备好了，点击<Link href={"/report"}>查看报告</Link>。</>
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
    <Nav status={status}></Nav>
    
    </>
}


export default dec