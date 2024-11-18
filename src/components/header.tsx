// 'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {Button} from "./ui/button"
import MaxWidthWrapper from "./max-width-wrapper"
import {AlignJustifyIcon} from "lucide-react"
import {currentUser} from "@/lib/auth"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
// import { signOut } from '@/auth'
import Logout from "./logout"
async function Header() {
  const user = await currentUser()

  return (
    <nav className=' bg-white shadow-sm z-50 sticky top-0 p-2 flex w-full justify-between items-center'>
      <MaxWidthWrapper className=' flex justify-between items-center'>
        <Link
          href={"/"}
          className='  font-bold h-[60px]  flex items-center justify-center gap-2'>
          <Image
            src={"/logo.png"}
            className='rounded-full h-[50px] w-[50px]'
            alt='logo'
            width={100}
            height={50}
          />
          <span className=' text-[#4d4d4d] text-2xl font-extrabold'>HOMS</span>
        </Link>
        <div className='sm:flex hidden gap-7'>
          <nav className=' flex justify-center items-center gap-7'>
            <Link
              href={"/about"}
              className=' p-2 transition-all rounded-lg hover:text-gray-400 font-bold  flex items-center justify-center text-[#4d4d4d] gap-2'>
              About
            </Link>
            <Link
              href={"/contact"}
              className='  font-bold  flex items-center justify-center text-[#4d4d4d] p-2 transition-all rounded-lg hover:text-gray-400 gap-2'>
              Contact
            </Link>
          </nav>
          {!user && (
            <>
              {" "}
              <Button
                variant={"secondary"}
                className='  font-bold  flex items-center justify-center bg-[#4caf4f] text-[#ffffff] gap-2 hover:bg-[#4d4d4d]'>
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button
                variant={"secondary"}
                className='  font-bold  flex items-center justify-center bg-[#4caf4f] text-white gap-2 hover:bg-[#4d4d4d]'>
                <Link href={"/register"}>Register</Link>
              </Button>
            </>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='bg-green-700  font-bold'>
                  <AvatarImage src={user.image! || ""} alt='@shadcn' />
                  <AvatarFallback className=' bg-slate-700 text-white'>
                    {user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <AlignJustifyIcon className=' sm:hidden' color='white' />
      </MaxWidthWrapper>
    </nav>
  )
}

export default Header
