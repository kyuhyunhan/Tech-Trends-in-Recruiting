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
            <div className={styles.description}>
                본 페이지는 국내 채용 사이트에 게시된 채용 공고의 데이터를 활용하여 만들어졌습니다. 각 수치는 해당 기술이 사이트 내 공고들에 명시된 횟수를 의미합니다.<br/>
                본 페이지의 자료는 공식적인 근거로 이용될 수 없고, 참고용으로만 이용하시기 바랍니다.<br/>
                본 페이지에서 제공하는 정보의 사용/공유로 인해 발생된 문제의 책임은 전적으로 사용자에게 있습니다.
            </div>

            <main className={styles.chlidren}>
                { children }
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
        </div>
    )
}