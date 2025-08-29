import React from 'react'

const AuthLayout = ({children}: {children: Readonly<React.ReactNode>}) => {
  return (
    <main className='flex items-center justify-center flex-col h-dvh'>{children}</main>
  )
}

export default AuthLayout