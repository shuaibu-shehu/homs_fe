'use client'

import { Bed, useBedStore } from '@/hooks/bed-store';
import React, { useEffect, useState } from 'react'
import { Header } from './header';
import useStaffStore from '@/hooks/staff-store';
import { Footer } from './footer';
import { RealTimeData } from './realtime-data';
import { HistoricalData } from './historical-data';
import { HistoricalDataTable } from './historical-data-table';
import { getDailyConsumption } from '@/lib/actions/bed';
import { DailyConsumption } from '@/lib/types/bed';





function BedPage({ bedId }: { bedId: string }) {
    const { findBedById } = useBedStore();
    const { department } = useStaffStore();
    const [bed, setBed] = useState<Bed | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false);
    const [dailyConsumption, setDailyConsumption] = useState<DailyConsumption[]>([]);
    const [type, setType] = useState<'sensor' | 'manual'>('sensor');
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const bed = findBedById(bedId);
        if (bed) {
            setBed(bed);
        }

        const fetchDailyConsumption = async () => {
            const dailyConsumption = await getDailyConsumption(bedId);
            if (dailyConsumption?.success) {
                setDailyConsumption(dailyConsumption?.data.map((item: any) => ({
                    date: item.date,
                    totalConsumption: item.total_consumption.toFixed(2)
                })));
            }
        }

        fetchDailyConsumption();

    }, [bedId, isClient]);

    if (!isClient) {
        return null;
    } 

    return (
        <div className="min-h-screen transparent dark:bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <Header
                    type={type}
                    onTypeChange={setType}
                    bedNumber={bed?.bed_number?.toString() || ''}
                    department={department?.name || ''}
                    dailyConsumption={dailyConsumption}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RealTimeData
                        bed={bed as Bed}
                        type={type}
                    />
                    <HistoricalData dailyConsumption={dailyConsumption} />
                    <HistoricalDataTable
                        data={dailyConsumption}
                        sortOrder={sortOrder}
                        onSortOrderChange={setSortOrder}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
                        
                <Footer />
            </div>
        </div>
  )
}

export default BedPage