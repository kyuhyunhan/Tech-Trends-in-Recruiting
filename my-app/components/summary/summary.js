import React from 'react';
import SummaryBox from './summarybox/summarybox.js';

const summary = ( props ) => {
    const summaryBoxTitle = ['가장 공고가 많은 언어', '가장 공고가 많은 데이터베이스', '확인된 회사 수', '확인된 공고 수'];
    const summaryBoxDetail = [props.data.language[0]['name'],props.data.database[0]['name'], props.data.companyCount, props.data.postCount];

    const summaryBox = summaryBoxTitle.map((title,index) => (
        <SummaryBox title={title} detail={summaryBoxDetail[index]} key={index+1}></SummaryBox>
    ))
    return <>{summaryBox}</>
}
export default summary;