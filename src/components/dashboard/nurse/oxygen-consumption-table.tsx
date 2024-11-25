'use client';

import { Button } from '@/components/ui/button';
import ReusableTable from '@/components/global/custome-table';
// import useOxygenStore from '@/hooks/oxygen-store';
import { useModal } from '@/hooks/modal-store';
import React from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { OxygenEntry } from '@/lib/types';
import CustomeSearch from '@/components/global/custome-search';
import { useStaffStore } from '@/hooks/staff-store';

function OxygenConsumptionTable() {
    const { onOpen } = useModal();
    const { department, oxygenEntries, loading } = useStaffStore();

    const columns = [
        { header: 'Total Oxygen Consumed', accessor: 'oxygen_consumption' },
        { header: 'Bed Number', accessor: 'bed_number' },
        { header: 'Remarks', accessor: 'remarks' },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (value: unknown) => {
                const row = value as OxygenEntry;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontalIcon className='cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='text-xs'>
                            <DropdownMenuItem className='text-xs'>
                                <Button variant='ghost' className='w-full text-black h-[30px] text-xs bg-transparent'>
                                    <Link className='w-full text-center -p-[5px]' href={`/oxygen/view/${row.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-xs'>
                                <Button
                                    onClick={() => onOpen('deleteOxygenEntry', { entryId: row.id })}
                                    variant='destructive'
                                    className='w-full h-[30px] text-black text-xs'>
                                    Delete
                                </Button>
                            </DropdownMenuItem>
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

                    <Button
                        onClick={() => onOpen('addOxygenEntry', { departmentId: department?.id as string })}
                        className="bg-custome-green-300 mx-4 hover:bg-custome-green-300"
                    >
                        Add Entry
                    </Button>
                </div>
            </div>

            {(oxygenEntries.length > 0 && !loading) && (
                <ReusableTable columns={columns} data={oxygenEntries} />
            ) }
            
            {(oxygenEntries.length === 0 && !loading) && (
                <div className='flex justify-center items-center'>
                    <h1 className='text-gray-800 text-xl font-bold m-2'>No oxygen consumption records found</h1>
                </div>
            )}

            {loading && <div className='flex justify-center items-center'><h1 className='text-gray-800 text-xl font-bold m-2'>Loading...</h1></div>}
        </div>
    );
}

export default OxygenConsumptionTable;
