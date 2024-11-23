'use client'

import { Department } from "@/lib/types";
import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Building, User2, ChartLine } from "lucide-react";
// import { ReactNode } from "react";
const UserCard = ({ type, details }:
    { type: string, details?: Department[] }) => {
    console.log(details);
    
    const getType = (type: string) => {
        switch (type) {
            case 'Departments':
                return Building;
            case 'Active sensor':
                return ChartLine;
            case 'staff':
                return User2;
            default:
                return Building;
        }
    };
    const LucideIcon = getType(type);
    
    return (
        <div className="rounded-2xl p-4 flex-1 gap-1 w-[230px] h-[141px] flex flex-col justify-center items-center bg-white">
            <div className="flex justify-between items-center">
                {/* <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    2024/25
                    </span> */}
                {/* <DotsHorizontalIcon width={20} height={20} /> */}
            </div>
            <LucideIcon className="min-w-[30px] min-h-[30px] mx-auto text-lamaPurple" />
            <p className={cn("text-xs text-gray-500")}>Total {type}</p>
            <h1 className="text-2xl font-semibold">{details?.length}</h1>
            {/* <p className={cn(`bg-custome-red-100 px-1 text-xs rounded-full ${type === 'sensor' ? 'bg-custome-green-200' : ''}`)}>
                {details}
            </p> */}
            {/* <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2> */}
        </div>
    );
};

export default UserCard;