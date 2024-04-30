import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import { Re } from './em-status/report';


interface Props{ // for hinting
    report:{val:Re}
}


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'PBFT交易池统计结果 - 柱状图',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const PbftBarChart: React.FC<Props> = ({report})=>{
    const {pbftShardCsv} = report.val
    const labels = pbftShardCsv.map((_,i)=>`Round ${i+1}`)

    const data = {
        labels,
        datasets: [
          {
            label: '交易池大小',
            data: pbftShardCsv.map((v)=>v.txpool_size),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
          },
          {
            label: '交易计数',
            data: pbftShardCsv.map((v)=>v.tx),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 1',
          },
        ],
      };

    return <Bar options={options} data={data} />;
}