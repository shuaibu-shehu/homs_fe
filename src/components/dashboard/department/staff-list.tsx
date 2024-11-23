'use client';

import CustomeTable from "@/components/global/custome-table";
// import { useModal } from "@/hooks/modal-store";
// import CustomeSearch from "@/components/global/custome-search";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Department, User } from "@/lib/types";

// Define a type for the row data with optional properties
type RowData = {
    id?: number;
    name?: string;
    // image?: string;
    role?: string;
    department?: string;
    status?: string;
    leaveStatus?: string;
    dateHired?: string;
    lastLogin?: string;
    contact?: string;
};

// Define the Column type
type Column = {
    header: string;
    accessor: string;
    render?: (value: unknown) => React.ReactNode;
};

// Map the cols array to match the Column type, excluding 'id'
const cols: Column[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    // { header: 'Department', accessor: 'department' },
    { header: 'Leave Status', accessor: 'status' },
    { header: 'Contact', accessor: 'contact' },
    {header:"email", accessor:"email"},
    { 
        header: 'Action', 
        accessor: 'action', 
        render: (value: unknown) => {
            // const row = value as RowData;
            console.log(value);
            
            return <button  className="px-3 py-1 bg-custome-green-300 text-white rounded"><MoreHorizontal /></button>
        } 
    }
];


const StaffManagementTable = ({staffs}: {staffs: User[]}) => {
    // const { onOpen } = useModal();
    return (
        <div className="overflow-hidden rounded-md  px-7 max-w-[90vw]  mx-auto bg-transparent">
            <CustomeTable columns={cols as Column[]} data={staffs as unknown as RowData[]} />
        </div>
    );
};

export default StaffManagementTable;
