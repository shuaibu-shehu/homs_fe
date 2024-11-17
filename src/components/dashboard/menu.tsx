import { currentRole } from "@/lib/auth"; // Fetches current user role
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

const menuItems = [
    {
        title: "MAIN MENU",
        items: [
            {
                icon: <Home size={20} />,
                label: "Home",
                href: "/admin",
                visible: ["admin", "medical-staff", "technician", "system-admin"],
            },
            {
                icon: <Building size={20} />, // Icon for Departments
                label: "Departments",
                href: "/departments",
                visible: ["admin"],
            },
            {
                icon: <Users size={20} />,
                label: "Patients",
                href: "/patients",
                visible: ["admin", "medical-staff"],
            },
            {
                icon: <Bell size={20} />,
                label: "Alerts",
                href: "/alerts",
                visible: ["admin", "medical-staff", "technician"],
            },
            {
                icon: <Activity size={20} />,
                label: "Sensors",
                href: "/sensors",
                visible: ["admin", "technician", "system-admin"],
            },
            {
                icon: <TrendingUp size={20} />,
                label: "Forecasting",
                href: "/forecasting",
                visible: ["admin", "system-admin"],
            },
            {
                icon: <FileText size={20} />,
                label: "Logs",
                href: "/logs",
                visible: ["admin", "system-admin"],
            },
            {
                icon: <Users size={20} />,
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
                icon: <User size={20} />,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "medical-staff", "technician", "system-admin"],
            },
            {
                icon: <Settings size={20} />,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "medical-staff", "technician", "system-admin"],
            },
            {
                icon: <LogOut size={20} />,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "medical-staff", "technician", "system-admin"],
            },
        ],
    },
];


const Menu = async () => {
    const role = await currentRole(); // Retrieve the logged-in user's role
    // const role = "admin"
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
                                        href={item.href}
                                        key={item.label}
                                        className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-200 p-2"
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
