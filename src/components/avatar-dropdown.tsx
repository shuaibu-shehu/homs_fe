import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import Logout from './logout'
import { currentUser } from '@/lib/auth';

async function AvatarDropdown() {
    const user = await currentUser();
  return (
      <DropdownMenu>
          <DropdownMenuTrigger><Avatar className='bg-green-700  font-bold'>
              <AvatarImage src={user.image! || ""} alt="@shadcn" />
              <AvatarFallback className=' bg-slate-700 text-white'>{user.email?.charAt(0)}</AvatarFallback>
          </Avatar></DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Logout /></DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default AvatarDropdown