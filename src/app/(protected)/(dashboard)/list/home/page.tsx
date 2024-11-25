import AdminPage from '@/components/dashboard/admin/admin-main-page'
import NursePage from '@/components/dashboard/nurse/nurse-main-page'
import DoctorPage from '@/components/dashboard/doctor/doctor-page'
import { currentUser } from '@/lib/auth'
import React from 'react'
async function AdminDashboardPage() {

  const user = await currentUser()
  
  return (
    <div>
      <h1 className='text-2xl font-bold m-4'>{user?.hospital?.name}</h1>
      {user?.role === "admin" && <AdminPage />}
      {user?.role === "nurse" && <NursePage />}
      {user?.role === "doctor" && <DoctorPage />}
    </div>
  )
}
export default AdminDashboardPage