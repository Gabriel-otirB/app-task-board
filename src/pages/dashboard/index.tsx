import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getSession } from 'next-auth/react'

import styles from './styles.module.css';

import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import TextArea from '../../components/textArea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

import { db } from '../../services/firebaseConnection';

import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

import { Slide, toast } from 'react-toastify';

interface HomeProps {
  user: {
    email: string;
  }
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

const Dashboard = ({ user }: HomeProps) => {

  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTarefas() {

      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      )

      onSnapshot(q, (snapshot) => {
        let lista = [] as TaskProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          })
        });

        setTasks(lista);
      })

    }

    loadTarefas();
  }, [user?.email])

  const handleChangePublic = (event: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(event.target.checked);
  };

  const handleRegisterTask = async (event: FormEvent) => {
    event.preventDefault();

    if (input.trim() === "") return;

    try {

      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: user?.email,
        public: publicTask
      });

      setInput('');
      setPublicTask(false);

      toast.success('Tarefa criada com sucesso', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async (id: string) => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );

    toast.info('A tarefa foi copiada para sua área de transferência', {
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, 'tarefas', id)
      await deleteDoc(docRef);

      toast.success('Tarefa deletada com sucesso', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.error(error);
    }

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

              <button className={styles.button} type='submit'>Registrar</button>
            </form>

          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas Tarefas</h1>

          {tasks.map((task) => (
            <article key={task.id} className={styles.task}>
              {task.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>Publico</label>
                  <button className={styles.sharedButton} onClick={() => handleShare(task.id)}>
                    <FiShare2 size={22} color='#0053ff' />
                  </button>
                </div>
              )
              }

              <div className={styles.taskContent}>

                {task.public ? (
                  <Link href={`/task/${task.id}`}>
                    <p>{task.tarefa}</p>
                  </Link>
                ) : (
                  <p>{task.tarefa}</p>
                )}

                <button className={styles.trashButton}>
                  <FaTrash size={24} color='#ea3140' onClick={() => handleDelete(task.id)} />
                </button>
              </div>
            </article>
          ))}

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
    props: {
      user: {
        email: session?.user?.email,
      }
    },
  };
};