import DepartmentTabs from '@/components/dashboard/department/department-tabs';
// import {  } from '@mui/material';
import React from 'react'

async function page() {
  
  return (
      <div className='w-full flex flex-col justify-center items-center p-4'>
        {/* <h1 className='text-2xl font-bold m-4'>{res?.data.name} Department</h1> */}
       <DepartmentTabs />
        </div>
  )
}

export default page