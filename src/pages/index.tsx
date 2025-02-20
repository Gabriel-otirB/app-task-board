import Head from 'next/head';
import styles from '@/styles/home.module.css';
import Image from 'next/image';

import spykeImg from '../../public/assets/spyke.svg';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head >
        <title>Tarefas+ | Organize suas tarefas de forma fácil </title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.spyke}
            alt='Logo Tarefas+'
            src={spykeImg}
            priority
          />
        </div>
        
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12 posts</span>
          </section>
          <section className={styles.box}>
            <span>+90 comentários</span>
          </section>
        </div>

      </main>
    </div>
  );
}
