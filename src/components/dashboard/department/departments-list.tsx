'use client';
import CustomeSearch from '@/components/global/custome-search';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
} from '@/components/ui/table';
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

function DepartmentList() {
    // Data for departments
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
            <Table className="w-full bg-white border-collapse">
                <TableHeader className="bg-custome-green-200 text-custome-green-300">
                    <TableRow>
                        <TableHead className="w-[150px] text-custome-green-300 px-4 py-2">
                            Department Name
                        </TableHead>
                        <TableHead className="text-custome-green-300 px-4 py-2">Staffs</TableHead>
                        <TableHead className="text-custome-green-300 px-4 py-2">Patients</TableHead>
                        <TableHead className="text-custome-green-300 px-4 py-2">Status</TableHead>
                        <TableHead className="text-custome-green-300 px-4 py-2">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {departments.map((department, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="px-4 py-2">{department.departmentName}</TableCell>
                            <TableCell className="px-4 py-2">{department.staffs}</TableCell>
                            <TableCell className="px-4 py-2">{department.patients}</TableCell>
                            <TableCell className="px-4 py-2">{department.status}</TableCell>
                            <TableCell className="px-4 py-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                    {department.action}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} className="text-center px-4 py-2">
                            Total Departments: {departments.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export default DepartmentList;
