import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';

import { getSession } from 'next-auth/react'
import TextArea from '../../components/textArea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

const Dashboard = () => {

  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  const handleChangePublic = (event: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(event.target.checked);
  };

  const handleRegisterTask = (event: FormEvent) => {
    event.preventDefault();

    if(input.trim() === "") return;

    alert("Teste");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual a sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder='Digite qual sua tarefa...'
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa publica?</label>
              </div>

              <button className={styles.button} type='submit'>Registar</button>
            </form>

          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>Publico</label>
              <button className={styles.sharedButton}>
                <FiShare2 size={22} color='#0053ff' />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Minha primeira tarefa de exemplo show de mais!</p>
              <button className={styles.trashButton}>
                <FaTrash size={24} color='#ea3140' />
              </button>
            </div>
          </article>

        </section>

      </main>

    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};