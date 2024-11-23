'use client';
import CustomeSearch from '@/components/global/custome-search';
import { Button } from '@/components/ui/button';
import ReusableTable from '@/components/global/custome-table';
import useAdminStore from '@/hooks/admin-store';
import { useModal } from '@/hooks/modal-store';
import React from 'react';
import { Department } from '@/lib/types';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';




function DepartmentList() {
    const { onOpen } = useModal();
    const { departments } = useAdminStore();

    const columns = [
        { header: 'Department Name', accessor: 'name' },
        { header: 'Staffs', accessor: 'staffs' },
        { header: 'Patients', accessor: 'patients' },
        { header: 'Status', accessor: 'status' },
        {
            header: 'Action',
            accessor: 'action',
            render: (value: unknown) => {
                const row = value as Department;
                return <DropdownMenu >
                    <DropdownMenuTrigger>
                        <MoreHorizontalIcon className='cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='text-xs'>
                        <DropdownMenuItem className='text-xs'>
                            <Button variant='ghost' className='w-full text-black h-[30px] text-xs bg-transparent'>
                                <Link className='w-full text-center -p-[5px] ' href={`/list/departments/${row.id as string}`}>View</Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-xs '>
                            <Button
                                onClick={() => onOpen('deleteDepartment', { departmentId: row.id })}
                                variant='destructive' className='w-full h-[30px] text-black text-xs'>Delete</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        }
    ];
    
    return (
        <div className="py-4 bg-white">
            <div className="flex m-3 justify-between w-full">
                <h1 className="text-gray-800 text-xl font-bold m-2">Departments</h1>
                <div className="flex md:flex-row w-[400px] items-center">
                    <CustomeSearch placeholder="search department" />
                    <Button
                        onClick={() => onOpen('addDepartment')}
                        className="bg-custome-green-300 mx-4 hover:bg-custome-green-300"
                    >
                        Add Department
                    </Button>
                </div>
            </div>
            {departments.length > 0 && <ReusableTable columns={columns} data={departments} />}
            {departments.length === 0 && <div className='flex justify-center items-center h-screen'>
                <h1 className='text-gray-800 text-xl font-bold m-2'>No departments found</h1>
            </div>}
        </div>
    );
}

export default DepartmentList;
