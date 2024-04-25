/// 裱在内容区中，状态展示区外的框框。
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Connecting from "./em-status/connecting"
import {Status,progress,status} from "@/store/store"
import Hello from "./em-status/hello"
import { Button, Flex, Progress } from "antd"
import { Receiver } from "./sup_monitor"
import Link from "next/link"
import { report } from '@/store/store';
import Head from 'next/head';
import { Report } from '@/components/em-status/report';
import { useEffect } from "react"

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

const startListen = () => {
    console.log("start the receiver")
    const rv = new Receiver()
    rv.start().then(() => {
        console.log('Receiver Exit.')
    })
}

const Header: React.FC<Props> = observer(({status})=>{
    useEffect(()=>{
        startListen()
    },[])
    return <div>
    <h1>Emulator运行中 状态为<code className="">{Status[status.val]}</code></h1>
    </div>
})


const RR = observer(Report)

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
                        return <div className="rounded-lg border-2 border-blue-500 shadow">

                            <Flex wrap="wrap" gap="middle" style={{ marginTop: 16 }}>
                                <Progress
                                    type="dashboard"
                                    steps={8}
                                    percent={progress.val.count/progress.val.total*100}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20}
                                />
                            </Flex>
                            <div>正在运行中:</div>
                            <div>有{progress.val.count}个交易处理完毕</div>
                            <div>这次运行的总量为{progress.val.total}个交易。</div>
                        </div>
                    case Status.RunningFailed:
                        return <>运行失败，请关闭重启。</>
                    case Status.Completed:
                        return <div className="rounded-lg border-2 border-blue-500 shadow">
                            <div className="border-8 rounded-lg	">运行完毕</div>
                            <article className="text-wrap rounded-lg border-8 shadow bg-white">
                                <h3 className="text-2xl border-white ">报告</h3>
                                <div className="rounded-lg border-white border-8">
                                    <RR report={report} ></RR>
                                </div>
                            </article>
                        </div>
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
    return <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
    <Header status={status}></Header>
    <Nav status={status}></Nav>
    
    </div>
}


export default dec