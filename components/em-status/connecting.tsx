import { Button, Card } from "antd"

interface Request{
    
}

interface Reply{
    code: number
}

interface Props{
    connected: boolean, ready: boolean
}

const rr: React.FC<Props> = (connected, ready) => {
    return <>
        {connected ?
            <div>
                加载中。。。。。连接中。。。。
            </div>
            : ready ?
                <div>已连接。Sup未运行</div>
                : <div>Sup已准备就绪</div>
        }
    </>
}

rr.defaultProps = {
    connected: false,
    ready: false,
}

export default rr