import Head from 'next/head'
import { Header } from '../components'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram 2.20</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}
