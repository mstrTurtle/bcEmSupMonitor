import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Tooltip } from 'antd';

import type { TreeDataNode, TreeProps } from 'antd';
import { FlagOutlined, NumberOutlined, FormOutlined } from '@ant-design/icons';

import { Mo } from './em-status/report';
import _ from 'lodash';

const toFix2IfNum = (v:string|number) => {
    if (typeof(v)=="number"){
        return v.toFixed(2)
    }
    return v
}

const makeData: ((mos: Mo[]) => CollapseProps['items']) = (ms: Mo[]) => {
    return ms.map((m, i) => {
        return {
            label: m.name,
            key: `${i}`,
            children: <div>
                {
                    m.elems.map((v, j) => {
                        
                        let desc = v.desc?v.desc:"（没有描述）"
                        return <div className='flex flex-row content-between m-4 items-center'>
                            <div className='shrink mx-4 font-bold'>{v.name}</div>
                            <Tooltip title={desc} placement='right'>
                            <div className='shrink text-xs font-mono'>(?)</div>
                            </Tooltip>
                            <div className='grow'/>
                            <div className='font-bold font-mono'>{(v.val)}</div>
                        </div>
                    })

                }
            </div>,

        }
    })
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const genStrList = (n:number)=>{
    const r = _.range(n).map((i)=>i.toString())
    return r
}

const MetricsDrawer: React.FC<{mos:Mo[]}> = ({mos}) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={makeData(mos)} defaultActiveKey={genStrList(mos.length)} onChange={onChange} />;
};

export default MetricsDrawer;