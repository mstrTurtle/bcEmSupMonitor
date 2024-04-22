import { report } from "@/store/store"
import { Button } from "antd"

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


export const Report: React.FC<Props> = ({ report }) => {
    return <>
    <Button type="primary" onClick={()=>{downloadObjectAsJson(report.val,"report")}}>下载json</Button>
    <div>Shard结果</div>
        <div>{JSON.stringify(report.val.pbftShardCsv)}</div>
        <div>测度输出</div>
        {f()}
        {
            report.val.measureOutputs.map(
                ({name,vals})=>{
                    return <div key={name}>
                        <div>测度名：{name}</div>
                        <div>测度值：</div>
                        <div>{JSON.stringify(vals)}</div>
                    </div>
                }
            )
        }
        <div>{JSON.stringify(report.val.measureOutputs)}</div>
    </>
}

