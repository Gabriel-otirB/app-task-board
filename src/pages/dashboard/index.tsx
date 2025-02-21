import { GetServerSideProps } from 'next';
import styles from './styles.module.css';
import Head from 'next/head';

import { getSession } from 'next-auth/react'

const Dashboard = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <h1>Pagina Painel</h1>
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  // console.log(session);

  if (!session?.user) {
    // Se não tem usuário vamos redirecionar para /
    return {
      redirect: {
        destination: '/',
        permanet: false,
      },
    };
  }

  return {
    props: {},
  };
};