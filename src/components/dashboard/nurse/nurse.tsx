'use client'

import React, { useEffect, useState } from 'react'
import { Department } from '@/lib/types';
import OverviewCards from './overview-cards';
import OxygenConsumptionTable from './oxygen-consumption-table';
import { useStaffStore } from '@/hooks/staff-store';
import { getOxygenConsumptionOfTheDay } from '@/lib/actions/department';
import { useBedStore } from '@/hooks/bed-store';
import { getBeds, getTodaysConsumptionByDepartment } from '@/lib/actions/bed';

function Nurse({ department}: {department: Department}) {
const { setBeds } = useBedStore();
  const { setDailyOxygenConsumption, setDepartment, loading, setLoading, dailyOxygenConsumption, setOxygenEntries } = useStaffStore();
  // console.log("department: ", department);
  const [totalTodaysConsumption, setTotalTodaysConsumption] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const data = await getOxygenConsumptionOfTheDay(
        //   department.id as string, 
        //   new Date().toISOString().split('T')[0]
        // );

        const todaysConsumption = await getTodaysConsumptionByDepartment(department?.id || '');

        if (todaysConsumption?.success) {
          setTotalTodaysConsumption(todaysConsumption?.data?.reduce((acc: number, curr: any) => acc + curr.total_consumption, 0) || 0);
        }
        const beds = await getBeds(department.id as string);
        // console.log("beds: ", beds);
        if (beds?.success) {
          setBeds(beds.data);
        }
      
      } catch (err) {
        console.log("error: ", err);
        // setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setDepartment(department);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ department.id, setDailyOxygenConsumption]); // Re-run when department ID changes
  
  return (
      <div>
      {loading && <div>Loading...</div> }
        {!loading && <OverviewCards 
            totalTodaysConsumption={totalTodaysConsumption}
      />}
          <OxygenConsumptionTable />
    </div>
  )
}

export default Nurse