import '../styles/globals.css'
import { TodosProvider } from '../context/TodosContex'

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className='container mx-auto my-10 max-w-sm'>
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  )
}

export default MyApp
