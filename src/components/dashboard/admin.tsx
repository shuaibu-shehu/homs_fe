'use client'
// import { getUsers } from '@/lib/actions/hospital';
// import { currentUser } from '@/lib/auth';
import React, { useEffect } from 'react'
import UserCard from '../user-card'
// import { MoveUp } from 'lucide-react'
import RealtimeUsageCard from './realtime_usage-card'
// import dynamic from "next/dynamic";
// import OxygenPieChart from './piechart-oxygen';
import NotificationsAndAlerts from './notifications-and-alerts';
// import ForecastWidget from './forecasting-widget';
import OxygenGraph from './oxygen-graph';
import useAdminStore from '@/hooks/admin-store';
import { Department } from '@/lib/types';
// import { Department } from '@/lib/types';

// const OxygenGraph = dynamic(() => import("./oxygen-graph"), { ssr: false });

function Admin({ departments, users, user }: { departments: Department[], users: any, user: any }) {
  const { setHospitals, setDepartments, setUsers } = useAdminStore();
  
  useEffect(() => {
    setHospitals(user.hospital);
    if(departments.length > 0){
      const departmentsWithStaffs = departments.map((department: Department) => ({ ...department, staffs: department.users.length }));
      setDepartments(departmentsWithStaffs);
    }
    setUsers(users);
  }, [departments, setDepartments, setHospitals, setUsers, user.hospital, users]);

  return (
    <div className='flex flex-col lg:flex-row gap-4 p-2 w-[100%] mx-auto'>
      <div className='flex flex-col gap-5 w-[100%] lg:w-[70%]'>
        <div className='flex gap-3 flex-wrap mx-auto'>
          <UserCard type="Departments" details={departments} />
          <UserCard type="staff" details={users} />
          <RealtimeUsageCard />
        </div>
        <div className='flex flex-col mx-auto items-center justify-center xl:justify-around xl:flex-row flex-grow  w-[100%]'>
          <OxygenGraph departments={departments as Department[]}/>
        </div>
        <div>
          {/* <ForecastWidget /> */}
        </div>
      </div>
      <div>
        <NotificationsAndAlerts />
      </div>
    </div>
  );
}

export default Admin;