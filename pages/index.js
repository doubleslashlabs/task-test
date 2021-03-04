import { useEffect, useContext } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContex } from '../context/TodosContex'
import TodoForm from '../components/TodoForm'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContex)
  const { user } = useUser()

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  console.log(initialTodos)

  return (
    <div>
      <Head>
        <title>Next JS - Task Manager</title>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='UTF-8' />
      </Head>
      <Navbar user={user} />
      <main>
        <h1 className='text-2xl text-center mb-4'>
          Todo List of {user ? user.nickname : null || 'Anonymous'}
        </h1>
        <TodoForm />
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage()
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        error: 'Something went wrong',
      },
    }
  }
}
