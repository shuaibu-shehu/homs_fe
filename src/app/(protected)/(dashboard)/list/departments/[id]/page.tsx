import OxygenConsumptionChart from '@/components/dashboard/department/oxygen-consumption-chart';
import { CardTitle, Card, CardHeader, CardContent } from '@/components/ui/card';
import { getDepartmentById } from '@/lib/actions/department'
// import {  } from '@mui/material';
import { Droplet, Users } from 'lucide-react';
import React from 'react'

async function page({ params }: { params: { id: string } }) {
  
    const id = params.id
    const res = await getDepartmentById(id)
    console.log("res: ", res);
    // const department = res?
    return (
      <div className='w-full flex flex-col justify-center items-center p-4'>
        <h1 className='text-2xl font-bold m-4'>{res?.data.name} Department</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 m-4 mx-auto'>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Current Number of Patients</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">Active Oxygen Connections</CardTitle>
              <Droplet className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              {/* <p className="text-xs text-muted-foreground">71% of total patients</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
              <CardTitle className="text-sm font-medium">Staffs in this department</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              {/* <p className="text-xs text-muted-foreground">71% of total patients</p> */}
            </CardContent>
          </Card>
        </div>
        {/* <DepartmentPage /> */}
        <OxygenConsumptionChart />
        </div>
  )
}

export default page