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
completed = json.dumps({
    "type":"completed",
    "content": {
        "pbftShardCsv":[{"txpool_size":100,"tx":11,"ctx":12}]*100,
        "measureOutputs":[
            {"name":"avgSTP", "vals":[12,13,41]},
        ]*100
    }
})
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
