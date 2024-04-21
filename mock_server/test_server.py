#!/usr/bin/env python

import asyncio
import json

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
    "type":"started",
    "content": None
    })
computing = lambda i: json.dumps({
    "type":"computing",
    "content": {
        "count": i*10,
        "total" : 100,
    }
    })
        
        
async def handler(ws:websockets.WebSocketServerProtocol):
    await ws.send(hello)
    
    await asyncio.sleep(3)
    await ws.send(started)
    
    for i in range(10):
        await asyncio.sleep(3)
        await ws.send(computing(i))
        
    await asyncio.sleep(3)
    await ws.send(completed)
    
    
    await asyncio.sleep(3)
    await ws.send(bye)


async def main():
    async with websockets.serve(handler, "", 7697):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
