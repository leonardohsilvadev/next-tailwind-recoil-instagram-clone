import Head from 'next/head'
import { Feed, Header } from '../components'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Feed />
    </div>
  )
}

const styles = {
  container: 'bg-gray-50 h-screen overflow-y-scroll scrollbar-hide',
}
