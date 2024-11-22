'use client';
import CustomeSearch from '@/components/global/custome-search';
import { Button } from '@/components/ui/button';
import ReusableTable from '@/components/global/custome-table';
import { useModal } from '@/hooks/modal-store';
import React from 'react';

const departments = [
    {
        departmentName: "Cardiology",
        staffs: 15,
        patients: 45,
        status: "Active",
        action: "View",
    },
    {
        departmentName: "Neurology",
        staffs: 10,
        patients: 30,
        status: "Active",
        action: "View",
    },
    {
        departmentName: "Pediatrics",
        staffs: 20,
        patients: 60,
        status: "Active",
        action: "View",
    },
    {
        departmentName: "Orthopedics",
        staffs: 12,
        patients: 25,
        status: "Inactive",
        action: "View",
    },
    {
        departmentName: "Oncology",
        staffs: 18,
        patients: 50,
        status: "Active",
        action: "View",
    },
    {
        departmentName: "Surgery",
        staffs: 25,
        patients: 70,
        status: "Active",
        action: "View",
    },
];

const columns = [
    { header: 'Department Name', accessor: 'departmentName' },
    { header: 'Staffs', accessor: 'staffs' },
    { header: 'Patients', accessor: 'patients' },
    { header: 'Status', accessor: 'status' },
    { 
        header: 'Action', 
        accessor: 'action', 
        render: (action: unknown) => <button className="px-3 py-1 bg-custome-green-300 text-white rounded">{action as string}</button> 
    }
];

function DepartmentList() {
    const { onOpen } = useModal();
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
            <ReusableTable columns={columns} data={departments} />
        </div>
    );
}

export default DepartmentList;
