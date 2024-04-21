'use client'
import Decorate from '@/components/decorate'
import Link from 'next/link';
import { Button, FloatButton } from 'antd';
import { useEffect } from 'react';
import { Receiver } from '@/components/sup_monitor';
import { Report } from '@/components/em-status/report';
import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import { report } from '@/store/store';
import Head from 'next/head';

const RR = observer(Report)

export default function Page() {
    return <>
    <Head>
        <title>Report</title>
    </Head>
        <RR report={report} ></RR>
        <main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>2024</h1></main>
    </>
}