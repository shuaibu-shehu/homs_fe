'use client';

import { Button } from '@/components/ui/button';
import ReusableTable from '@/components/global/custome-table';
// import useOxygenStore from '@/hooks/oxygen-store';
import { useModal } from '@/hooks/modal-store';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import CustomeSearch from '@/components/global/custome-search';
import { useStaffStore } from '@/hooks/staff-store';
import { Bed, useBedStore } from '@/hooks/bed-store';

function  OxygenConsumptionTable() {
    const { onOpen } = useModal();
    const { beds } = useBedStore();
    const { department, loading } = useStaffStore();
  
    
    const columns = [
        { header: 'Bed Number', accessor: 'bed_number' },
        { header: 'Total Oxygen Consumed', accessor: 'oxygen_consumption' },
        // { header: 'Remarks', accessor: 'remarks' },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (value: unknown) => {
                const row = value as Bed;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontalIcon className='cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='text-xs dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white'>
                            <DropdownMenuItem className='text-xs'>
                                <Button variant='ghost' className='w-full  hover:bg-gray-600 dark:hover:bg-gray-600  h-[30px] text-xs bg-transparent'>
                                    <Link className='w-full text-center -p-[5px]' href={`/list/beds/${row.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem className='text-xs'>
                                <Button
                                    onClick={() => onOpen('deleteBed', { bedId: row.id })}
                                    variant='destructive'
                                    className='w-full hover:bg-gray-800 dark:hover:bg-gray-700  h-[30px] text-xs bg-transparent text-red-500'>
                                    Delete
                                </Button>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div className="py-4  flex flex-col gap-4 m-3">
            <div className="flex m-3 flex-col  justify-between">
                <h1 className="whitespace-nowrap m-3  text-gray-800 text-xl sm:text-2xl font-bold m-2">Oxygen Consumption</h1>
                <div className="flex md:flex-row w-[400px] items-center">
                    <CustomeSearch placeholder="search oxygen entry" />

                    {/* <Button
                        onClick={() => onOpen('addOxygenEntry', { departmentId: department?.id as string })}
                        className="bg-custome-green-300 mx-4 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white hover:bg-custome-green-300"
                    >
                        Add Entry
                    </Button> */}
                </div>
            </div>

            {(beds.length > 0 && !loading) && (
                <ReusableTable 
                    columns={columns} 
                    data={beds.map(bed => ({
                        id: bed.id,
                        bed_number: bed.bed_number,
                        oxygen_consumption: bed.oxygen_consumption,
                        actions: bed
                    }))} 
                />
            ) }
            
            {(beds.length === 0 && !loading) && (
                <div className='flex justify-center items-center'>
                    <h1 className='text-gray-800 text-xl font-bold m-2'>No beds found</h1>
                </div>
            )}

            {loading && <div className='flex justify-center items-center'><h1 className='text-gray-800 text-xl font-bold m-2'>Loading...</h1></div>}
        </div>
    );
}

export default OxygenConsumptionTable;
