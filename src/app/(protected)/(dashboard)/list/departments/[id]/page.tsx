import DepartmentTabs from '@/components/dashboard/department/department-tabs';
// import {  } from '@mui/material';
import React from 'react'
import { getDailyConsumptionsByDepartment } from '@/lib/actions/bed';

async function page({ params }: { params: { id: string } }) {
  const res = await getDailyConsumptionsByDepartment(params.id)
  console.log("res daily by departmnet: ", res);
  const sumByDate = res?.data.reduce((acc: any, curr: any) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.total_consumption;
    return acc;
  }, {});
  const updatedData= Object.entries(sumByDate).map(([date, total_consumption]) => ({ date, total_consumption }));
  console.log("sumByDate: ", updatedData);
  return (
      <div className='w-full flex flex-col justify-center items-center p-4'>
        {/* <h1 className='text-2xl font-bold m-4'>{res?.data.name} Department</h1> */}
       <DepartmentTabs data={updatedData} />
        </div>
  )
}

export default page