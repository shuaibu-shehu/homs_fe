'use client'

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardTitle, Card, CardHeader, CardContent } from '@/components/ui/card';
import {  Users, Settings, FileText, UserCog, LineChart } from 'lucide-react';
import OxygenConsumptionChart from './oxygen-date-consumption-chart';
import OxygenPerPatientChart from './oxygen-patinent-chart';
import { Separator } from '@/components/ui/separator';
import CustomeSearch from '@/components/global/custome-search';
import { Button } from '@/components/ui/button';
import useAdminStore from '@/hooks/admin-store';
import { useModal } from '@/hooks/modal-store';
import { useParams } from 'next/navigation';
import { Department } from '@/lib/types';
import StaffManagementTable from './staff-list';
const DepartmentTabs = () => {

    const { onOpen } = useModal()
    const { departments } = useAdminStore();
    const params = useParams();
    const id = params.id;
    const [currentDepartment, setCurrentDepartment] = useState<Department | null>(() => {
        return departments.find(department => department.id === id) || null;
    });

    useEffect(() => {
        const department = departments.find(department => department.id === id) || null;
        setCurrentDepartment(department);
    }, [departments, id]);
    
    console.log(currentDepartment?.users);
    return (
        <Tabs defaultValue="overview"  className="w-full max-w-[100vw] flex flex-col  gap-4 items-center justify-center">
            <TabsList className=" mx-auto flex justify-around  w-full grid-cols-4 lg:grid-cols-8 m-5 bg-transparent">
                <TabsTrigger value="overview" className=" border-b-2 border-transparent px-4 py-2 hover:text-gray-700 data-[state=active]:border-green-500 data-[state=active]:text-green-500 bg-transparent">
                    <LineChart className="h-4 w-4 mx-2" />
                    Overview
                </TabsTrigger>
              
               
                <TabsTrigger
                    value="staff"
                    className="border-b-2 border-transparent px-4 py-2 hover:text-gray-700 data-[state=active]:border-green-500 data-[state=active]:text-green-500 bg-transparent">
                    <UserCog className="h-4 w-4 mx-2" />
                    Staff
                </TabsTrigger>
                {/* <TabsTrigger
                    value="sensors"
                    className="border-b-2 border-transparent px-4 py-2 hover:text-gray-700 data-[state=active]:border-green-500 data-[state=active]:text-green-500 bg-transparent">
                    <Radio className="h-4 w-4" />
                    Sensors
                </TabsTrigger> */}
                <TabsTrigger
                    value="reports"
                    className="border-b-2 border-transparent px-4 py-2 hover:text-gray-700 data-[state=active]:border-green-500 data-[state=active]:text-green-500 bg-transparent">
                    <FileText className="h-4 w-4 mx-2" />
                    Reports
                </TabsTrigger>
                <TabsTrigger 
                    value="settings"
                    className="border-b-2 border-transparent px-4 py-2 hover:text-gray-700 data-[state=active]:border-green-500 data-[state=active]:text-green-500 bg-transparent">
                    <Settings className="h-4 w-4 mx-2" />
                    Settings
                </TabsTrigger>
            </TabsList>
            <Separator className="w-full -m-4" />
            
            <h1 className='text-2xl font-bold m-3'>{currentDepartment?.name} Department</h1>
            <TabsContent value="overview" className="space-y-7 ">
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 m-4'>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
                            <CardTitle className="text-sm font-medium">Current Patients</CardTitle>
                            <Users className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentDepartment?.patients}</div>
                            {/* <p className="text-xs text-muted-foreground">+2 from yesterday</p> */}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                            <CardTitle className="text-sm font-medium">Staffs</CardTitle>
                            <Users className="h-6 w-6 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentDepartment?.staffs}</div>
                            {/* <p className="text-xs text-muted-foreground">Full capacity</p> */}
                        </CardContent>
                    </Card>
                </div>
                <OxygenConsumptionChart />
                <OxygenPerPatientChart />
            </TabsContent>

            <TabsContent value="patients" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Patient statistics and trends will be shown here</p>
                    </CardContent>
                </Card>
            </TabsContent>


            <TabsContent value="staff" className='outline-none transparent border-none mt-5'>
                <Card className=' border-none bg-transparent shadow-none  '>
                    <CardHeader>
                        <CardTitle className=' ml-16 font-bold text-2xl'>Staff Management</CardTitle>
                    </CardHeader>
                    <CardContent className=' border-3 border-custome-green-300'>
                        <div className="flex ml-16 justify-between  max-w-[90%]">
                            <div className="flex md:flex-row w-[400px]  items-center">
                                <CustomeSearch placeholder="search department" />
                                <Button
                                    onClick={() => onOpen('addStaff')}
                                    className="bg-custome-green-300 mx-4 hover:bg-custome-green-300"
                                    >
                                    Add Staff
                                </Button>
                            </div>
                        </div>
                        <div className=' p-8 overflow-hidden'>

                            {(currentDepartment?.users?.length ?? 0) > 0 ? (
                                <StaffManagementTable staffs={currentDepartment?.users || []} />
                            ) : (
                                <p>No staffs found</p>
                            )}                            

                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="reports">
                <Card>
                    <CardHeader>
                        <CardTitle>Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Report generation tools will be shown here</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="settings">
                <Card>
                    <CardHeader>
                        <CardTitle>Department Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Department settings and configurations will be shown here</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default DepartmentTabs;