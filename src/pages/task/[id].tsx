import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import { ChangeEvent, FormEvent, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import { db } from '../../services/firebaseConnection';
import { doc, collection, query, where, getDoc, getDocs, addDoc, } from 'firebase/firestore';

import TextArea from '../../components/textArea';

interface TaskProps {
  item: {
    tarefa: string;
    created: string;
    public: boolean;
    user: string;
    taskId: string;
  },
  allComments: CommentProps[]
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

const Task = ({ item, allComments }: TaskProps) => {

  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);

  const handleComment = async (event: FormEvent) => {
    event.preventDefault();

    if (input.trim() === "") return;

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId
      });

      const data = {
        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId
      }

      setComments((prevComments) => [...prevComments, data]);
      setInput('');
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>

        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>

        <form onSubmit={handleComment}>
          <TextArea placeholder="Digite seu comentário..." value={input} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)} />
          <button className={styles.button} disabled={!session?.user}>Enviar comentário</button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos comentários</h2>
        {comments.length == 0 && (
          <span>Nenhum comentário foi encontrado...</span>
        )}

        {
          comments.map((item) => (
            <article key={item.id} className={styles.comment}>
              <div className={styles.headComment}>
                {item.user === session?.user?.email ?
                  (<label className={styles.commentsLabel}>{item.name}</label>) :
                  (<label className={styles.ownerCommentsLabel}>{item.name}</label>)
                }
                {item.user === session?.user?.email && (
                  <button className={styles.buttonTrash}>
                    <FaTrash size={18} color='#EA3140' />
                  </button>
                )}
              </div>
              <p>{item.comment}</p>
            </article>
          ))
        }

      </section>

    </div>
  )
}

export default Task

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, 'tarefas', id)

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapshotComments = await getDocs(q);

  let allComments: CommentProps[] = [];

  const snapshot = await getDoc(docRef);
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    })
  });

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    tarefa: snapshot?.data()?.tarefa,
    public: snapshot?.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot?.data()?.user,
    taskId: id,
  }

  return {
    props: {
      item: task,
      allComments: allComments,
    },
  }

} 