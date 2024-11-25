// import Menu from "@/components/Menu";
// import Navbar from "@/components/Navbar";
import Menu from "@/components/dashboard/menu";
import Navbar from "@/components/dashboard/navbar";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link
                    href="/"
                    className="flex items-center justify-center lg:justify-start gap-2"
                >
                    <Image className=" rounded-full" src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold">HOMS</span>
                </Link>
                <Menu />
            </div>
            {/* RIGHT */}
            <div className="w-[86%] md:w-[92%] max-h=[calc(100vh-64px)] lg:w-[84%] xl:w-[86%] bg-[#EAFBEA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
