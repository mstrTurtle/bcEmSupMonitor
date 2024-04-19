interface Re {
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
    report:Re
}

const rr: React.FC<Props> = ({ report }) => {
    return <>
    <div>Shard结果</div>
        <div>{JSON.stringify(report.pbftShardCsv)}</div>
        <div>测度输出</div>
        {
            report.measureOutputs.map(
                ({name,vals})=>{
                    return <div>
                        <div>测度名：{name}</div>
                        <div>测度值：</div>
                        <div>{vals}</div>
                    </div>
                }
            )
        }
        <div>{JSON.stringify(report.measureOutputs)}</div>
    </>
}

export default rr
