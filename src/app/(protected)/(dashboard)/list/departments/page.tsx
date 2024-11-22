import Department from '@/components/dashboard/department/department'
import { currentUser } from '@/lib/auth';
import React from 'react'

async function page() {

  const user = await currentUser();
  
  return (
    <div><Department /></div>
  )
}

export default page