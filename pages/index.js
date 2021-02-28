import Head from 'next/head'
import Navbar from '../components/Navbar'
import { table, minifyRecords } from './api/utils/airtable'

export default function Home({ initialTodos }) {
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
