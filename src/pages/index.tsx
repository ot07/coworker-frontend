import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {Header} from "../components/Header/Header";
import {Sidebar} from "@/components/Sidebar/Sidebar";

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <Header/>
      <div className="flex h-screen">
        <Sidebar/>
        <main className="flex-1">
          <h1 className="text-3xl font-bold underline bg-sky-300">
            Hello world!
          </h1>
        </main>
      </div>
    </>
  )
}
