'use client'
// import { getUsers } from '@/lib/actions/hospital';
// import { currentUser } from '@/lib/auth';
import React from 'react'
import UserCard from '../user-card'
// import { MoveUp } from 'lucide-react'
import RealtimeUsageCard from './realtime_usage-card'
import dynamic from "next/dynamic";
// import OxygenPieChart from './piechart-oxygen';
import NotificationsAndAlerts from './notifications-and-alerts';
import ForecastWidget from './forecasting-widget';
import OxygenGraph from './oxygen-graph';

// const OxygenGraph = dynamic(() => import("./oxygen-graph"), { ssr: false });

function Admin() {
  // const [users, setUsers] = React.useState()
  // const user = await currentUser()

  // React.useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //             console.log("fetching users");

  //             const response = await getUsers();
  //             const data = response;
  //             setUsers(data);
  //             console.log("fetched users", data);
  //         } catch (error) {
  //             console.error('Error fetching users:', error);
  //         }
  //     };
  //     fetchUsers();
  // }, []);

  // console.log("user: ", user);
  return (
    <div className='flex flex-col lg:flex-row gap-4 p-2 w-[100%] mx-auto'>
      <div className='flex flex-col gap-5 w-[100%] lg:w-[70%]'>
        <div className='flex gap-3 flex-wrap mx-auto'>
          <UserCard type="Departments" details={"2 crticals"} />
          <UserCard type="sensor" details={"4 online"} />
          <UserCard type="staff" />
          <RealtimeUsageCard />
        </div>
        <div className='flex flex-col mx-auto items-center justify-center xl:justify-around xl:flex-row flex-grow  w-[100%]'>
          <OxygenGraph />
          {/* <OxygenPieChart /> */}
        </div>
        <div>
          {/* <ForecastWidget /> */}
        </div>
      </div>
      <div>
        <NotificationsAndAlerts />
      </div>
    </div>

  )
}

export default Admin