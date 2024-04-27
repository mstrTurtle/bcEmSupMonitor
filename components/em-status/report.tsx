import { report } from "@/store/store"
import { Button, NotificationArgsProps, Table, Tabs, TabsProps, Tag, Tooltip, Typography, notification } from "antd"

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import React, { useMemo } from "react";
import {PbftBarChart} from "@/components/bar";
import {InfoCircleTwoTone} from "@ant-design/icons"

const { Title, Paragraph, Text, Link } = Typography;

export interface Re {
    pbftShardCsv: {
        txpool_size: number
        tx: number
        ctx: number
    }[]
    measureOutputs: {
        name: string
        desc: string
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
        title: '轮数',
        dataIndex: 'round',
        key: 'round',
    },
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

// 处理测度输出的
const ff = (outputs: {
    name: string;
    desc: string;
    vals: number[];
}[]) => {
    return outputs.map(({ name,  desc, vals }, idx) => {
        return {
            name:<>
                <b className="m-4">{name}</b>
                <Tooltip placement="right" title={desc} >
                <InfoCircleTwoTone className="text-lg" />  {/* 拿来当Tooltip用的，显示单位 */}
                </Tooltip>
            </>, vals: <>{((vals.map((n: number) => {
                return <>
                    <Tag>{n.toFixed(2)}</Tag>
                </>
            })))}</>, key: idx
        }
    })
}

const Context = React.createContext({ name: 'Default' }); // 负责弹窗的Context

export const Report: React.FC<Props> = ({ report }) => {
    var csvData = report.val.pbftShardCsv.map(({txpool_size,tx,ctx},idx)=>{return {round:idx+1,txpool_size,tx}})

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '表格视图',
          children: <Table dataSource={(csvData)} columns={columns1} />,
          icon: <AppleOutlined/>,
        },
        {
          key: '2',
          label: '柱状图视图',
          children: <PbftBarChart report={report}/>,
          icon: <AndroidOutlined/>,
        },
      ];
    
      const [api, contextHolder] = notification.useNotification();

      const openNotification = (msg: string) => {
        api.info({
          message: msg,
          description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
          placement:"bottomRight",
        });
      };

      
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return <>
        <div className="flex flex-row-reverse">
            <Button className="mr-12" type="primary" onClick={() => { downloadObjectAsJson(report.val, "report") }}>导出并下载json</Button>
        </div>
        <div className="font-bold">PBFT交易池统计结果：</div>
        
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Tabs defaultActiveKey="1" items={items} centered onChange={(key: string) => { openNotification(`切换到面板${key}`) }} />;
        </Context.Provider>
        <hr className="my-12" />
        <div className="font-bold">测度输出</div>
        {f()}
        <Table dataSource={ff(report.val.measureOutputs)} columns={columns} />
        <Typography>
            <Paragraph>
                <blockquote>原始输出</blockquote>
                <pre>{JSON.stringify(report.val.measureOutputs)}</pre>
            </Paragraph>
        </Typography>
    </>
}

