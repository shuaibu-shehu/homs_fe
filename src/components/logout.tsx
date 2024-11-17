'use client'
import React from 'react'

import { signOut } from 'next-auth/react'
// import { signOut } from '@/auth'

function Logout() {
  return (
    <button onClick={() => signOut()}>logout</button>
  )
}

export default Logout