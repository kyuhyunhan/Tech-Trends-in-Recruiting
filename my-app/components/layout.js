import { getStaticProps } from '../pages';
import styles from './layout.module.css';

export default function Layout({ children, date }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span>
                    <div>
                        <h1 className={styles.title}>
                            국내 SW 개발자/엔지니어 채용 기술 현황⚡️
                        </h1>
                    </div>
                    <div>
                        최종 업데이트: {date}
                    </div>
                </span>
                <span>
                    <div>데이터 활용 : programmers rocketpunch</div>
                    <div>문의/개선사항: kyuhyunhaan@gmail.com</div>
                </span>
            </header>

            { children }
        </div>
    )
}