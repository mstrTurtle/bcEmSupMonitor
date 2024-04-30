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
                        "val": 0.015625
                    },
                    {
                        "name": "节点2 CPU时间",
                        "desc": "",
                        "val": 0.0625
                    },
                    {
                        "name": "节点0 CPU时间",
                        "desc": "",
                        "val": 0.046875
                    },
                    {
                        "name": "平均计数",
                        "desc": "",
                        "val": 0.041666666666666664
                    }
                ]
            },
            {
                "name": "EMma时间",
                "desc": "交易计数，是指对交易的计数。",
                "elems": [
                    {
                        "name": "节点1 CPU时间",
                        "desc": "",
                        "val": 0.015625
                    },
                    {
                        "name": "节点2 CPU时间",
                        "desc": "",
                        "val": 0.0625
                    },
                    {
                        "name": "节点0 CPU时间",
                        "desc": "",
                        "val": 0.046875
                    },
                    {
                        "name": "平均计数",
                        "desc": "",
                        "val": 0.041666666666666664
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
        
        # await asyncio.sleep(1)
        await ws.send(started)
        print("sent started")
        
        for i in range(10):
            # await asyncio.sleep(0)
            await ws.send(computing(i))
            
        # await asyncio.sleep(1)
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
