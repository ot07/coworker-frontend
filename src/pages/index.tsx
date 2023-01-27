import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {Header} from "../components/Header/Header";

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <Header/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}
