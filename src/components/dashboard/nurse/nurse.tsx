'use client'

import React, { useEffect } from 'react'
import { Department } from '@/lib/types';
import OverviewCards from './overview-cards';
import OxygenConsumptionTable from './oxygen-consumption-table';
import { useStaffStore } from '@/hooks/staff-store';
import { getOxygenConsumptionOfTheDay } from '@/lib/actions/department';

function Nurse({ department}: {department: Department}) {
  // const [oxygenConsumption, setOxygenConsumption] = useState<any>(null);
  // const [error, setError] = useState<Error | null>(null);
  const { setDailyOxygenConsumption,setDepartment, loading, setLoading, dailyOxygenConsumption, setOxygenEntries } = useStaffStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getOxygenConsumptionOfTheDay(
          department.id as string, 
          new Date().toISOString().split('T')[0]
        );
        const { individualOxygenConsumptions, ...rest } = data.data;
        setOxygenEntries(individualOxygenConsumptions);
        
        console.log("rest: ", rest);
        setDailyOxygenConsumption(rest);
        
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
            dailyOxygenConsumption={dailyOxygenConsumption} 
          />}
          <OxygenConsumptionTable />
    </div>
  )
}

export default Nurse