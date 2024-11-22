'use client';

import CustomeTable from "@/components/global/custome-table";
import { Button } from "@/components/ui/button";
// import { useModal } from "@/hooks/modal-store";
// import CustomeSearch from "@/components/global/custome-search";
import React from "react";
import { MoreHorizontal } from "lucide-react";

// Sample data
const rows = [
    {
        id: 1,
        name: "Wade Warren",
        image: "https://via.placeholder.com/150",
        role: "Doctor",
        department: "Surgery",
        status: "Active",
        leaveStatus: "On Leave (2 weeks)",
        dateHired: "8/21/15",
        lastLogin: "11/18/24",
        contact: "wade.warren@example.com",
    },
    {
        id: 2,
        name: "Aremu Femi",
        image: "https://via.placeholder.com/150",
        role: "Nurse",
        department: "Emergency Services",
        status: "Active",
        leaveStatus: "Not on Leave",
        dateHired: "11/7/16",
        lastLogin: "11/19/24",
        contact: "aremu.femi@example.com",
    },
    {
        id: 3,
        name: "Cody Fisher",
        image: "https://via.placeholder.com/150",
        role: "Technician",
        department: "Radiology",
        status: "Inactive",
        leaveStatus: "Terminated",
        dateHired: "4/4/18",
        lastLogin: "N/A",
        contact: "cody.fisher@example.com",
    },
    {
        id: 4,
        name: "Eleanor Pena",
        image: "https://via.placeholder.com/150",
        role: "Nurse",
        department: "Pediatrics",
        status: "Active",
        leaveStatus: "Not on Leave",
        dateHired: "5/30/14",
        lastLogin: "11/20/24",
        contact: "eleanor.pena@example.com",
    },
];

// Define a type for the row data with optional properties
type RowData = {
    id?: number;
    name?: string;
    image?: string;
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
const cols: Column[] = Object.keys(rows[0])
    .filter(key => key !== 'id') // Exclude 'id' from columns
    .map(key => ({
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        accessor: key
    }));

// Add a new column for actions with a custom cell renderer
cols.push({
    header: "Actions",
    accessor: "actions",
    render: (value: unknown) => {
        const val = value as RowData; // Cast value to RowData
        return (
            <Button variant="ghost" onClick={() => handleActionClick(val)}>
                <MoreHorizontal />
            </Button>
        );
    }
});

// Function to handle button click
const handleActionClick = (val: RowData) => {
    console.log("Row data:", val);
    // Perform any action with the row data
};

const StaffManagementTable = () => {
    // const { onOpen } = useModal();
    return (
        <div className="overflow-hidden rounded-md  px-7 max-w-[90vw]  mx-auto bg-transparent">
        
            <CustomeTable columns={cols as Column[]} data={rows as RowData[]} />
        </div>
    );
};

export default StaffManagementTable;
