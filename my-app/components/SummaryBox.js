import React from 'react';
import styles from './summaryBox.module.css';

const SummaryBox = ( props ) => {
    return (
        <div className={styles.box}>
            <h3>{props.title}</h3>
            <div className={styles.detail}>
                {(props.detail=='JS')?'JavaScript':props.detail}
            </div>
        </div>
    )
}

export default SummaryBox;