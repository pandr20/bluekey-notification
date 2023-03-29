import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="bg-primary-black overflow hidden">
        <h1>Hello world</h1>
      </div>
    </>
    
  )
}
