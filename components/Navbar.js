import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'

export default function NavBar() {
  const { user } = useUser()
  return (
    <nav className='flex justify-between items-center py-4'>
      <p className='text-2xl font-bold text-grey-800'>My Todos</p>
      <div className='flex'>
        {user && (
          <div>
            <a
              href='/api/auth/login'
              className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'
            >
              Log Out
            </a>
          </div>
        )}
        {!user && (
          <a
            href='/api/auth/logout'
            className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'
          >
            Log In
          </a>
        )}
      </div>
    </nav>
  )
}
