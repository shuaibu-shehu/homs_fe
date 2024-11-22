import Admin from '@/components/dashboard/admin'
import { getDepartments, getUsersInHospital } from '@/lib/actions/department'
import { currentUser } from '@/lib/auth'
import React from 'react'
async function AdminDashboardPage() {
  
  const user = await currentUser()
  
  const departments = await getDepartments()
   
  const users = await getUsersInHospital(user?.hospital?.id)
  
  return (
    <div>
      <h1 className='text-2xl font-bold m-4'>{user?.hospital?.name}</h1>
      <Admin departments={departments} />
    </div>
  )
}
export default AdminDashboardPage