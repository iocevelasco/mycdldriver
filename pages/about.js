import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LayoutComponent from '../components/layout/index.js';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutComponent>

      <p>About</p>

    </LayoutComponent>
    </div>
  )
}
