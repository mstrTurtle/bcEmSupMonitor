import React from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { FlagOutlined, NumberOutlined, FormOutlined } from '@ant-design/icons';

import { Mo } from './em-status/report';

// const treeData: TreeDataNode[] = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'fsadjijsd 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             disableCheckbox: true,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-1',
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
//       },
//     ],
//   },
// ];

const makeData: ((mos:Mo[])=> TreeDataNode[]) = (ms: Mo[])=>{

    return ms.map((m,i)=>{
      return {
        title: m.name,
        key: `0-${i}`,
        icon: <FlagOutlined />,
        children: m.elems.map((v,j)=>{
         return { 
          title: `${v.name} : ${v.val}`,
          key:`0-${i}-${j}`,
          icon: <NumberOutlined />,
        }

        }),
      }
    })
}

const MetricsTree: React.FC<{mos:Mo[]}> = ({mos}) => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      // checkable
      defaultExpandAll
      showLine
      showIcon
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={makeData(mos)}
    />
  );
};

export default MetricsTree;