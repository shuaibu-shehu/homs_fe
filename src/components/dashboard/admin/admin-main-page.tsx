import React from 'react'
import Admin from './admin'
import { getDepartments, getUsersInHospital } from '@/lib/actions/department'
import { currentUser } from '@/lib/auth'

async function AdminPage() {
    
    const user = await currentUser()
    
    const departments = await getDepartments()

    const users = await getUsersInHospital(user?.hospital?.id as string)
  return (
      <Admin user={user} departments={departments.success ? departments.data : []} users={users} />
  )
}

export default AdminPage