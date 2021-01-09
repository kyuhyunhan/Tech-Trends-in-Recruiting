import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import Layout from '../components/layout';
import modifyData from '../lib/data_modifier'

import Language from '../components/charts/Language';
import Database from '../components/charts/Database';
import FE_Top3 from '../components/charts/FE-top3';
import FE_StateMgmt from '../components/charts/FE-SML';
import FE_FEEtc from '../components/charts/FE-etc';
import BE from '../components/charts/BE';
import CPM from '../components/charts/CPM';
import ML_Data from '../components/charts/ML-data';
import SummaryBox from '../components/summaryBox';

export default function Home({ data }) {
  const summaryBoxTitle = ['가장 공고가 많은 언어', '가장 공고가 많은 데이터베이스', '확인된 회사 수', '확인된 공고 수'];
  const summaryBoxDetail = [data.language[0]['name'],data.database[0]['name'], data.companyCount, data.postCount];
  const summaryBox = summaryBoxTitle.map((title,index) => {
    return <SummaryBox title={title} detail={summaryBoxDetail[index]}></SummaryBox>
  })

  return (
    <Layout date={data.date}>
      <Head>
        <title>국내 SW 개발자 채용 기술 현황</title>
      </Head>

      <main className={styles.main}>
        
        <div className={styles.summaryInfo}>
          {summaryBox}
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
            <h3>프론트엔드 프레임워크</h3>
            <FE_Top3 data={data['FE']['top3Framework']}/>
          </span>

          <span className={`${styles.chart} ${styles.statemgmt}`}>
            <h3>프론트엔드 상태 관리 라이브러리</h3>
            <FE_StateMgmt data={data.FE.stateMgmtLibs}/>
          </span>

          <span className={`${styles.chart} ${styles.feetc}`}>
            <h3>그 외 프론트엔드 기술</h3>
            <FE_FEEtc data={data.FE.FEEtc}/>
          </span>

          <span className={`${styles.chart} ${styles.backend}`}>
            <h3>웹 백엔드 관련 기술</h3>
            <BE data={data.BE}/>
          </span>
          
          <span className={`${styles.chart} ${styles.mobile}`}>
            <h3>크로스플랫폼 모바일 프레임워크</h3>
            <CPM data={data.cross_platform_mobile}/>
          </span>

          <span className={`${styles.chart} ${styles.mldata}`}>
            <h3>머신러닝 / 데이터 엔지니어링</h3>
            <ML_Data data={data.ML_data}/>
          </span>
{/* 
          <span className={`${styles.chart} ${styles.etc}`}>
            <h3>기타 기술 키워드 TOP10</h3>
            listing
          </span> */}
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
  const rawData = fs.readFileSync('./dataset/test210109.json');
  const data = modifyData(JSON.parse(rawData));
  return {
    props: {
      data
    }
  }
}