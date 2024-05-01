#!/usr/bin/env python

import asyncio
import json
import datetime
import websockets


hello = json.dumps({
    "type":"hello",
    "content": None
    })
bye = json.dumps({
    "type":"bye",
    "content": None
    })
started = json.dumps({
    "type":"started",
    "content": None
    })
completed = """
{
    "type": "completed",
    "content": {
        "pbftShardCsv": [
            {
                "txpool_size": 2000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 10000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 10000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 8000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 6000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 4000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 2000,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 0,
                "tx": 2000,
                "ctx": 0
            },
            {
                "txpool_size": 0,
                "tx": 0,
                "ctx": 0
            },
            {
                "txpool_size": 0,
                "tx": 0,
                "ctx": 0
            }
        ],
        "measureOutputs": [
  {
    "name": "CPU时间",
    "desc": "交易计数，是指对交易的计数。",
    "elems": [
      {
        "name": "节点1 CPU时间",
        "desc": "",
        "val": 0.03125
      },
      {
        "name": "节点2 CPU时间",
        "desc": "",
        "val": 0.015625
      },
      {
        "name": "节点0 CPU时间",
        "desc": "",
        "val": 0.046875
      },
      {
        "name": "平均计数",
        "desc": "",
        "val": 0.03125
      }
    ]
  },
  {
    "name": "内存测量",
    "desc": "交易计数，是指对交易的计数。",
    "elems": [
      {
        "name": "节点1 内存测量",
        "desc": "",
        "val": 11726848
      },
      {
        "name": "节点2 内存测量",
        "desc": "",
        "val": 11948032
      },
      {
        "name": "节点0 内存测量",
        "desc": "",
        "val": 12054528
      },
      {
        "name": "平均计数",
        "desc": "",
        "val": 11909802
      }
    ]
  },
  {
    "name": "时间",
    "desc": "",
    "elems": [
      {
        "name": "节点1 时间",
        "desc": "",
        "val": 9223372036854776000
      },
      {
        "name": "节点2 时间",
        "desc": "",
        "val": 9223372036854776000
      },
      {
        "name": "节点0 时间",
        "desc": "",
        "val": 9223372036854776000
      },
      {
        "name": "平均运行时间",
        "desc": "",
        "val": 3074457345618258400
      }
    ]
  },
  {
    "name": "网络",
    "desc": "",
    "elems": [
      {
        "name": "节点1 上传",
        "desc": "",
        "val": 3246670
      },
      {
        "name": "节点1 下载",
        "desc": "",
        "val": 0
      },
      {
        "name": "节点2 上传",
        "desc": "",
        "val": 3246670
      },
      {
        "name": "节点2 下载",
        "desc": "",
        "val": 0
      },
      {
        "name": "节点0 上传",
        "desc": "",
        "val": 14193885
      },
      {
        "name": "节点0 下载",
        "desc": "",
        "val": 0
      },
      {
        "name": "平均上传流量",
        "desc": "",
        "val": 6895741
      },
      {
        "name": "平均下载流量",
        "desc": "",
        "val": 0
      }
    ]
  },
  {
    "name": "TCL",
    "desc": "Tx Confirm Latency",
    "elems": [
      {
        "name": "Epcho %!v(MISSING)",
        "desc": "",
        "val": 15.520226950000497
      },
      {
        "name": "TotalLatency",
        "desc": "",
        "val": 15.520226950000497
      }
    ]
  },
  {
    "name": "TPS avg",
    "desc": "平均每秒产生的交易，衡量交易的次数。单位为 交易/秒",
    "elems": [
      {
        "name": "Epoch 0",
        "desc": "",
        "val": 441.710618897754
      },
      {
        "name": "TotalTPS",
        "desc": "",
        "val": 441.710618897754
      }
    ]
  },
  {
    "name": "PCL",
    "desc": "Propose->Commit的",
    "elems": [
      {
        "name": "Epoch 0时的值",
        "desc": "",
        "val": 0.07860341250001149
      },
      {
        "name": "TotalLatency",
        "desc": "",
        "val": 0.07860341250001149
      }
    ]
  },
  {
    "name": "BCount",
    "desc": "Block count",
    "elems": [
      {
        "name": "Epoch 1",
        "desc": "",
        "val": 16000
      },
      {
        "name": "Total",
        "desc": "",
        "val": 16000
      }
    ]
  },
  {
    "name": "TPS avg",
    "desc": "平均每秒产生的交易，衡量交易的次数。单位为 交易/秒",
    "elems": [
      {
        "name": "Epoch 0",
        "desc": "",
        "val": 0
      },
      {
        "name": "All Epoch Total Tx Num",
        "desc": "",
        "val": 16000
      },
      {
        "name": "All Epoch Ctx Num",
        "desc": "",
        "val": 0
      },
      {
        "name": "Total CTX Ratio",
        "desc": "",
        "val": 0
      }
    ]
  },
  {
    "name": "TxCount",
    "desc": "",
    "elems": [
      {
        "name": "Epoch 1",
        "desc": "",
        "val": 16000
      },
      {
        "name": "Total Tx Num",
        "desc": "",
        "val": 16000
      }
    ]
  }
]
    }
}
"""
computing = lambda i: json.dumps({
    "type":"computing",
    "content": {
        "count": i*10,
        "total" : 100,
    }
    })
        
ptime= lambda : print(datetime.datetime.now())

async def handler(ws:websockets.WebSocketServerProtocol):
    try:
        ptime()
        print("in handler")
        await ws.send(hello)
        ptime()
        print("sent hello")
        await asyncio.sleep(3)
        
        await asyncio.sleep(3)
        await ws.send(started)
        print("sent started")
        await asyncio.sleep(3)
        
        for i in range(10):
            await asyncio.sleep(1)
            await ws.send(computing(i))
            
        await asyncio.sleep(1)
        await ws.send(completed)
        
        
        await asyncio.sleep(1)
        await ws.send(bye)
    except Exception as e:
        ptime()
        print(f"Exception: {e}")


async def main():
    async with websockets.serve(handler, "0.0.0.0", 7697):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
