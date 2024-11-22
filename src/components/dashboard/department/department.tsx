import React from 'react'
// import DepartmentBarChart from './department-chart'
import RealTimeOxygenConsumption from './realtime-oxygen-consumption-graph'
import DepartmentList from './departments-list'
import { currentUser } from '@/lib/auth';

async function Department() {
  
  const user = await currentUser();
  console.log(user);
  
  return (
    <div className='w-full min-h-screen'>
      {/* <DepartmentBarChart /> */}
        <h1>Departments</h1>
      <div className='flex flex-col lg:flex-row gap-4 p-2 w-[700px] mx-auto'>
      <RealTimeOxygenConsumption />
      </div>
      <DepartmentList />
    </div>
  )
}

export default Department