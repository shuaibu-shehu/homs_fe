'use client';

import CustomeTable from "@/components/global/custome-table";
// import { useModal } from "@/hooks/modal-store";
// import CustomeSearch from "@/components/global/custome-search";
import React from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/modal-store";
import { User } from "@/lib/types";
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




const StaffManagementTable = ({staffs}: {staffs: User[]}) => {
    const { onOpen } = useModal();

    // Map the cols array to match the Column type, excluding 'id'
    const cols: Column[] = [
        { header: 'Name', accessor: 'name' },
        { header: 'Role', accessor: 'role' },
        // { header: 'Department', accessor: 'department' },
        { header: 'Leave Status', accessor: 'status' },
        { header: 'Contact', accessor: 'contact' },
        { header: "email", accessor: "email" },
        {
            header: 'Action',
            accessor: 'action',
            render: (value: unknown) => {
                const user = value as User;
                // console.log(user);

                return (
                    <div className="flex gap-2">
                        <Button
                            variant='destructive'
                            className='w-full text-black h-[30px] text-xs'
                            onClick={() => onOpen('deleteStaff', { staffId: user.id, departmentId: user.departmentId })}
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="overflow-hidden rounded-md  px-7 max-w-[90vw]  mx-auto bg-transparent">
            <CustomeTable columns={cols as Column[]} data={staffs as unknown as RowData[]} />
        </div>
    );
};

export default StaffManagementTable;
