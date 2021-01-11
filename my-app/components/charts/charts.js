import React from 'react';
import styles from './charts.module.css';

import Language from './chart/language.js';
import Database from './chart/database.js';
import FE_Top3 from './chart/fetop3.js';
import FE_StateMgmt from './chart/fesml.js';
import FE_FEEtc from './chart/feetc.js';
import BE from './chart/be.js';
import CPM from './chart/cpm.js';
import ML_Data from './chart/mldata.js';

const charts = ( props ) => {
    return(
        <div className={styles.chartsGrid}>
            <span className={`${styles.chart} ${styles.language}`}>
                <h3>언어</h3>
                <Language data={props.data.language}/>
            </span>

            <span className={`${styles.chart} ${styles.database}`}>
                <h3>데이터 베이스</h3>
                <Database data={props.data.database}/>
            </span>

            <span className={`${styles.chart} ${styles.fetop3}`}>
                <h3>프론트엔드 프레임워크</h3>
                <FE_Top3 data={props.data.FE.top3Framework}/>
            </span>

            <span className={`${styles.chart} ${styles.statemgmt}`}>
                <h3>프론트엔드 상태 관리 라이브러리</h3>
                <FE_StateMgmt data={props.data.FE.stateMgmtLibs}/>
            </span>

            <span className={`${styles.chart} ${styles.feetc}`}>
                <h3>그 외 프론트엔드 기술</h3>
                <FE_FEEtc data={props.data.FE.FEEtc}/>
            </span>

            <span className={`${styles.chart} ${styles.backend}`}>
                <h3>웹 백엔드 관련 기술</h3>
                <BE data={props.data.BE}/>
            </span>
            
            <span className={`${styles.chart} ${styles.mobile}`}>
                <h3>크로스플랫폼 모바일 프레임워크</h3>
                <CPM data={props.data.cross_platform_mobile}/>
            </span>

            <span className={`${styles.chart} ${styles.mldata}`}>
                <h3>머신러닝 / 데이터 엔지니어링</h3>
                <ML_Data data={props.data.ML_data}/>
            </span>
        </div>
    )
}
export default charts;