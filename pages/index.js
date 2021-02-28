import { useEffect, useContext } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/airtable'
import { TodosContex } from '../context/TodosContex'

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContex)
  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  console.log(initialTodos)

  return (
    <div>
      <Head>
        <title>Next JS - Task Manager</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main>
        <h1>Todo List</h1>
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
