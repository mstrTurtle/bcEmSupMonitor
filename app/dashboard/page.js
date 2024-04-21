import App from "@/components/sidebar"
import Link from "next/link";

import { FloatButton } from 'antd';
export default function Page() {
    return <>
    <Link href={'https://github.com'} >
    <FloatButton  /></Link>
    <App/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>2024</h1></main>
    </>
  }