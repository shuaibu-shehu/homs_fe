'use client'
import Link from "next/link";
import {
    Home,
    Users,
    Bell,
    Activity,
    TrendingUp,
    FileText,
    User,
    Settings,
    LogOut,
    Building,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


const menuItems = [
    {
        title: "MAIN MENU",
        items: [
            {
                icon: <Home size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Home",
                href: "/home",
                visible: ["admin", "nurse", "doctor", "therapist", "technician", "system-admin"],
            },
            {
                icon: <Building size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Departments",
                href: "/departments",
                visible: ["admin"],
            },
            {
                icon: <Users size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Patients",
                href: "/patients",
                visible: ["admin", "nurse", "doctor"],
            },
            {
                icon: <Bell size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Alerts",
                href: "/alerts",
                visible: ["admin", "nurse", "doctor", "therapist", "technician"],
            },
            {
                icon: <Activity size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Sensors",
                href: "/sensors",
                visible: ["admin", "technician", "system-admin"],
            },
            {
                icon: <TrendingUp size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Forecasting",
                href: "/forecasting",
                visible: ["admin", "doctor", "system-admin"],
            },
            {
                icon: <FileText size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Logs",
                href: "/logs",
                visible: ["admin", "system-admin"],
            },
            {
                icon: <Users size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Staff Management",
                href: "/staff-management",
                visible: ["admin"],
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: <User size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "nurse", "doctor", "therapist", "technician", "system-admin"],
            },
            {
                icon: <Settings size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "nurse", "doctor", "therapist", "technician", "system-admin"],
            },
            {
                icon: <LogOut size={20} className="min-h-[20px] min-w-[20px]" />,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "nurse", "doctor", "therapist", "technician", "system-admin"],
            },
        ],
    },
];



const Menu = () => {
    const pathname = usePathname(); // Retrieve the current path
    const role = useSession().data?.user.role; // Retrieve the logged-in user's role
    const [currentPath, setCurrentPath] = useState("/"+pathname.split("/")[2]);
    // const role = "admin"

    useEffect(() => {
    console.log("role: ", role);
    
    setCurrentPath("/"+pathname.split("/")[2]);
        
}, [pathname, currentPath]);
    
    return (
        <div className="mt-4 space-y-10 py-4 flex flex-col   max-h-full overflow-auto">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2 h-full" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    <div className="flex flex-col gap-2 flex-grow text-sm">
                        {i.items.map((item) => {
                            if (item.visible.includes(role)) {
                                return (
                                    <Link
                                        href={"/list" + item.href}
                                        key={item.label}
                                        className={cn("flex items-center justify-center lg:justify-start gap-4 text-gray-500  px-2 rounded-md hover:bg-gray-200 p-2",
                                            currentPath == item.href && "hover:bg-custome-green-300 bg-custome-green-300 text-white "
                                        )}
                                    >
                                        {item.icon}
                                        <span className="hidden lg:block">{item.label}</span>
                                    </Link>
                                );
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Menu;
