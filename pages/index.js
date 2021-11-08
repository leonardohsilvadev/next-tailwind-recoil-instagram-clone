import Head from 'next/head'
import { Feed, Header, Modal } from '../components'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal />
      <Header />

      <Feed />
    </div>
  )
}

const styles = {
  container: 'bg-gray-50 h-screen overflow-y-scroll scrollbar-hide',
}
