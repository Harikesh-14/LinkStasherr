import React from 'react'
import Link from 'next/link'
import { Home, PersonStanding, FileQuestion, LogIn, Plus } from 'lucide-react'

import { ModeToggle } from './theme-changer'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function Navbar() {
  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-opacity-70 backdrop-blur-lg bg-white dark:bg-[#030712] dark:bg-opacity-70 transition-all duration-300 ease-in-out shadow-sm dark:shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className='flex gap-1 items-center text-2xl'>
          <svg className="w-10 h-10 text-[#6D28D9] rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
          </svg>
          <p>LinkStasher</p>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className='flex gap-5 items-center justify-center'>
            <ModeToggle />
            <Link href="/login" className="hidden md:block py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">Sign In</Link>
            <Link href="/register" className="hidden md:block py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">Sign Up</Link>
          </div>

          <Sheet>
            <SheetTrigger>
              <div data-collapse-toggle="navbar-sticky" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-800" aria-controls="navbar-sticky" aria-expanded="false">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <ul className="flex flex-col space-y-2 my-5">
                <li>
                  <Link href="/" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0" aria-current="page"> <Home size={20} /> Home</Link>
                </li>
                <li>
                  <Link href="/about" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0"><PersonStanding size={20} /> About</Link>
                </li>
                <li>
                  <Link href="/faq" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0"><FileQuestion size={20} /> FAQ</Link>
                </li>
              </ul>

              <hr />

              <div className='flex flex-col gap-5 justify-center items-center mt-5'>
                <SheetDescription>Account</SheetDescription>
                <Link href="/login" className="w-[110px] flex items-center justify-center gap-1 py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">
                  <LogIn size={20} />
                  Sign In
                </Link>
                <Link href="/register" className="w-[110px] flex items-center justify-center gap-1 py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">
                  <Plus size={20} />
                  Sign Up
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link href="/" className="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:scale-105 hover:-translate-y-1 hover:text-[#6D28D9] duration-300 ease-in-out" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:scale-105 hover:-translate-y-1 hover:text-[#6D28D9] duration-300 ease-in-out">About</Link>
            </li>
            <li>
              <Link href="/faq" className="block py-2 px-3 rounded md:bg-transparent md:p-0 hover:scale-105 hover:-translate-y-1 hover:text-[#6D28D9] duration-300 ease-in-out">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar