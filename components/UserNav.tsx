import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu'
import React from 'react'
import { MenuIcon } from 'lucide-react'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from 'next/link'

const UserNav = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser()
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
      <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
        <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

        <img
          src={ user?.picture ??
            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="Profile Image"
          className="rounded-full h-8 w-8 hidden lg:block"
        />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
          {user ? (
            <>
            <DropdownMenuItem>
            <Link href='/' className='w-full'>
                Bookmarks
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href='/' className='w-full'>
                My Listings
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link href='/' className='w-full'>
                About Us
            </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <LogoutLink className='w-full'>Log Out</LogoutLink>
            </DropdownMenuItem>
           
            </>
          ): (
          <>
            <DropdownMenuItem>
            <RegisterLink className='w-full'>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <LoginLink className='w-full'>Login</LoginLink>
            </DropdownMenuItem>
            </>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav