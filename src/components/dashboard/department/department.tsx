'use client'
import React from 'react'
// import DepartmentBarChart from './department-chart'
import RealTimeOxygenConsumption from './realtime-oxygen-consumption-graph'
import DepartmentList from './departments-list'

function Department() {
  
  return (
    <div className='w-full min-h-screen'>
      {/* <DepartmentBarChart /> */}
        <h1 className='text-custome-green-300 m-3 text-center font-bold text-3xl dark:text-white'>Departments</h1>
      <div className='flex flex-col lg:flex-row gap-4 p-2 w-[700px] mx-auto'>
      <RealTimeOxygenConsumption />
      </div>
      <DepartmentList />
    </div>
  )
}

export default Department