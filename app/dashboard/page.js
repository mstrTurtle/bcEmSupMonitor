import App from "@/components/sidebar"
import Link from "next/link";

import { FloatButton } from 'antd';
export default function Page() {
    return <>
    <Link href={'https://github.com'} >
    <FloatButton  /></Link>
    <App/></>
    return <main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>Hello, Next.js!</h1></main>
  }