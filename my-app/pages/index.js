import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import Layout from '../components/layout.js';
import modifyData from '../lib/data_modifier.js'

import Summary from '../components/summary/summary.js';
import Charts from '../components/charts/charts.js';

export default function Home({ data }) {
  
  return (
    <Layout date={data.date}>
      <Head>
        <title>국내 SW 개발자 채용 기술 현황</title>
      </Head>

      <main className={styles.main}>
        
        <div className={styles.summary}>
          <Summary data={data} />
        </div>
        <div>
          <Charts data={data} />
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Layout>
  )
}
export async function getStaticProps() {
  const rawData = fs.readFileSync('./dataset/210109.json');
  const data = modifyData(JSON.parse(rawData));
  return {
    props: {
      data
    }
  }
}