import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import Layout from '../components/layout';
import modifyData from '../lib/data_modifier'

import Language from '../components/charts/language';
import Database from '../components/charts/database';
import FE_Top3 from '../components/charts/FE-top3';
import FE_StateMgmt from '../components/charts/FE-SML';
import FE_FEEtc from '../components/charts/FE-etc';
import BE from '../components/charts/BE';
import CPM from '../components/charts/CPM';
import ML_Data from '../components/charts/ML-data';

export default function Home({ data }) {
  return (
    <Layout date={data.date}>
      <Head>
        <title>국내 SW 개발자 채용 기술 현황</title>
      </Head>

      <main className={styles.main}>
        
        <div className={styles.summaryInfo}>
          <div className={styles.box}>
            <h3>가장 공고가 많은 언어</h3>
          </div>
          <div className={styles.box}>
            <h3>가장 공고가 많은 데이터베이스</h3>
          </div>
          <div className={styles.box}>
            <h3>확인된 회사 수</h3>
          </div>
          <div className={styles.box}>
            <h3>확인된 공고 수</h3>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <span className={`${styles.chart} ${styles.language}`}>
            <h3>언어</h3>
            <Language data={data.language}/>
          </span>

          <span className={`${styles.chart} ${styles.database}`}>
            <h3>데이터 베이스</h3>
            <Database data={data.database}/>
          </span>

          <span className={`${styles.chart} ${styles.fetop3}`}>
            <h3>React.js / VUE.js / Angular.js</h3>
            <FE_Top3 data={data['FE']['top3Framework']}/>
          </span>

          <span className={`${styles.chart} ${styles.statemgmt}`}>
            <h3>상태 관리 라이브러리</h3>
            <FE_StateMgmt data={data.FE.stateMgmtLibs}/>
          </span>

          <span className={`${styles.chart} ${styles.feetc}`}>
            <h3>그 외 프론트엔드 기술</h3>
            <FE_FEEtc data={data.FE.FEEtc}/>
          </span>

          <span className={`${styles.chart} ${styles.backend}`}>
            <h3>웹 백엔드</h3>
            <BE data={data.BE}/>
          </span>
          
          <span className={`${styles.chart} ${styles.mobile}`}>
            <h3>Cross-platform mobile</h3>
            <CPM data={data.cross_platform_mobile}/>
          </span>

          <span className={`${styles.chart} ${styles.mldata}`}>
            <h3>머신러닝 / 데이터 엔지니어링</h3>
            <ML_Data data={data.ML_data}/>
          </span>

          <span className={`${styles.chart} ${styles.etc}`}>
            <h3>그 외 기술 키워드 TOP10</h3>
            listing
          </span>
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
// sortByValue() module
// correctString() module
export async function getStaticProps() {
  const rawData = fs.readFileSync('./dataset/test1224.json');
  let data = JSON.parse(rawData);

  data = modifyData(data);

  // const date = data['date'];
  // const language = data['language'];
  // const database = data['database'];
  // const FE_top3Framework = data['FE']['top3Framework'];
  // const FE_stateMgmtLibs = data['FE']['stateMgmtLibs'];
  // const FE_FEEtc = data['FE']['FEEtc'];
  // const BE_JS = data['BE']['JS'];
  // const BE_Java = data['BE']['Java'];
  // const BE_Python = data['BE']['Python'];
  // const BE_Ruby = data['BE']['Ruby'];
  // const BE_PHP = data['BE']['PHP'];
  // const BE_BEEtc = data['BE']['BEEtc'];
  // const cross_platform_mobile = data['cross_platform_mobile'];
  // const ML_data = data['ML_data'];
  // const ambiguity = data['ambiguity'];
  // const JS_testing = data['JS_testing'];
  // const etc = data['etc'];

  return {
    props: {
      data
    }
  }
}