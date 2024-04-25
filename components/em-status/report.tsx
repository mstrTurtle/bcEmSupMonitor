import { report } from "@/store/store"
import { Button, Table, Typography } from "antd"

const { Title, Paragraph, Text, Link } = Typography;

export interface Re {
    pbftShardCsv: {
        txpool_size: number
        tx: number
        ctx: number
    }[]
    measureOutputs: {
        name: string
        vals: number[]
    }[]

}

interface Props{ // for hinting
    report:{val:Re}
}

const f = ()=>{
    console.log(report)
    return <></>
}

// 输出并下载json
function downloadObjectAsJson(exportObj:object, exportName:string){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

const columns = [
    {
      title: '测度名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '测度值',
      dataIndex: 'vals',
      key: 'vals',
    },
];


const columns1 = [
    {
      title: 'txpool大小',
      dataIndex: 'txpool_size',
      key: 'txpool_size',
    },
    {
      title: 'tx计数',
      dataIndex: 'tx',
      key: 'tx',
    },
];

const ff = (outputs: {
    name: string;
    vals: number[];
}[])=>{
    return outputs.map(({name,vals},idx)=>{
        return {name,vals:(JSON.stringify(vals)),key:idx}
    })
}

export const Report: React.FC<Props> = ({ report }) => {
    return <>
    <Button type="primary" onClick={()=>{downloadObjectAsJson(report.val,"report")}}>导出并下载json</Button>
    <div className="font-bold">Shard结果：</div>
        {/* <div className="font-mono">{JSON.stringify(report.val.pbftShardCsv)}</div> */}
        <Table dataSource={(report.val.pbftShardCsv)} columns={columns1}/>
        <hr className="h-8"/>
        <div className="font-bold">测度输出</div>
        {f()}
        <Table dataSource={ff(report.val.measureOutputs)} columns={columns}/>
        {/* {
            report.val.measureOutputs.map(
                ({name,vals})=>{
                    return <div key={name}>
                        <div className="">测度名：</div>
                        <div className="">{name}</div>
                        <div className="">测度值：</div>
                        <div>{JSON.stringify(vals)}</div>
                    </div>
                }
            )
        } */}
        <Typography>
        <Paragraph>
            <blockquote>原始输出</blockquote>
            <pre>{JSON.stringify(report.val.measureOutputs)}</pre>
        </Paragraph>
        </Typography>
    </>
}

