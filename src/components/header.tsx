import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { Button } from './ui/button'
import MaxWidthWrapper from './max-width-wrapper'

function Header() {
  return (
    <nav className='bg-green-800/80 backdrop-blur-sm border-b-2 border-b-lime-900 z-50 sticky top-0 p-2 flex w-full justify-between items-center'>
        <MaxWidthWrapper className=' flex justify-between items-center'>

        <Link href={"/"} className='  font-bold h-[60px]  flex items-center justify-center gap-2'>
            <Image src={"/logo.png"} className='rounded-full h-[50px] w-[50px]' alt='logo' width={100} height={50}/>
           <span className=' text-white'>
            HOMS
           </span>
            </Link>
            <div className='flex gap-7'>

            <nav className=' flex justify-center items-center gap-7'>
                <Link href={"/about"} className=' p-2 transition-all rounded-lg hover:text-gray-400 font-bold  flex items-center justify-center text-gray-200 gap-2'>    
                    About
                </Link>         
                <Link href={"/contact"} className='  font-bold  flex items-center justify-center text-gray-200 p-2 transition-all rounded-lg hover:text-gray-400 gap-2'>
                    Contact 
                </Link> 
            </nav>
        <Button  variant={"secondary"} className='  font-bold  flex items-center justify-center text-green-700 gap-2'>
            <Link href={"/login"}>
             Login / Register
            </Link>
        </Button>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Header