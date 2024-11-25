import React, { Suspense } from 'react'
import { currentUser } from '@/lib/auth';
import { getDepartmentById} from '@/lib/actions/department';
import Nurse from './nurse';
async function NursePage() {
  const user = await currentUser();
  const department = await getDepartmentById(user?.departmentId as string);
  
  if (!department) {
    return <div>Department not found</div>;
  }
    return (
    <div className='p-4'>
       <h1 className='text-2xl font-bold my-2 text-center'>{department?.data?.name} Department</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Nurse department={department?.data} />
      </Suspense>
      </div>
  )
}

export default NursePage