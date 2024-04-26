/// 裱在内容区中，状态展示区外的框框。
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Connecting from "./em-status/connecting"
import {Status,progress,status} from "@/store/store"
import Hello from "./em-status/hello"
import { Button, Flex, Progress, Result, Spin } from "antd"
import { Receiver } from "./sup_monitor"
import Link from "next/link"
import { report } from '@/store/store';
import Head from 'next/head';
import { Report } from '@/components/em-status/report';
import { useEffect } from "react"
import { SmileOutlined } from '@ant-design/icons';

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
    return <div className="mx-auto">
    <h1 className="pb-3">Emulator运行中 状态为：<code className="font-bold text-xl">{Status[status.val]}</code></h1>
    </div>
})


const RR = observer(Report)

const Nav: React.FC<Props> = observer(({ status }) => {
    return <div>
        {
            (() => {
                switch (status.val) {
                    case Status.Init:
                        return <>初始状态 正在连接到Sup服务器。<Spin size="large"/><Hello></Hello></>
                    case Status.Connected:
                        return <div className="grow">连接成功 Sup还没开始运行。等待Sup开始运行。<Spin size="large"/></div>
                    case Status.ConnectionFailed:
                        return   <Result
                        status="error"
                        title="连接失败"
                        subTitle="请关闭后重新启动"
                      />
                    case Status.Running:
                        return <div className="flex">
                             <div className="rounded-lg border-2 border-blue-500 shadow mx-auto  w-6/12">

                            <Flex wrap="wrap" gap="middle" style={{ margin: 16 }}>
                                <Progress
                                    type="dashboard"
                                    steps={8}
                                    percent={Math.round(100*progress.val.count/progress.val.total)}
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20}
                                />
                                <Spin size="large"/>
                            </Flex>
                            <div className="m-8 text-xl">正在运行中:</div>
                            <div className="m-8 text-xl">有<b>{progress.val.count}</b>个交易处理完毕</div>
                            <div className="m-8 text-xl">这次运行的总量为<b>{progress.val.total}</b>个交易。</div>
                        </div>
                        </div>
                    case Status.RunningFailed:
                        return  <Result
                        status="error"
                        title="运行失败"
                        subTitle="请关闭后重新启动"
                      />
                    case Status.Completed:
                        return <div className="rounded-lg border-2 border-blue-500 shadow">
                            {/* <div className="border-8 rounded-lg	">运行完毕</div> */}
                            <Result
                                icon={<SmileOutlined />}
                                title="运行完毕!"
                            />
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
    return <div className="absolute left-1/2 top-5 translate-x-[-50%]  w-6/12 flex flex-col">
    <Header status={status}></Header>
    <Nav status={status}></Nav>
    
    </div>
}


export default dec