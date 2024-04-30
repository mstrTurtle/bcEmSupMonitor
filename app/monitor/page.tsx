'use client'
import Decorate from '@/components/decorate'
import Link from 'next/link';
import { Button, FloatButton } from 'antd';
import { useEffect } from 'react';
import { Receiver } from '@/components/sup_monitor';
import Head from 'next/head';
import { report } from '@/store/store';
import MetricsTree from '@/components/metricstree';

export default function Page() {
    const onClick = ()=>{
        console.log("start the receiver")
        const rv = new Receiver()
        rv.start().then(()=>{
            console.log('Receiver Exit.')
        }); // Start the process

    }
    return <>
    <Head>
        <title>Blockemulator Supervisor Monitor</title>
    </Head>

        <Link href={'https://github.com'} >
            <FloatButton />
        </Link>
        <Decorate></Decorate>
        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>2024</h1></main> */}
    </>
}