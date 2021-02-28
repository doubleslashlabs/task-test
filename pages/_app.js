import '../styles/globals.css'
import { TodosProvider } from '../context/TodosContex'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className='container mx-auto my-10 max-w-sm'>
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  )
}

export default MyApp
