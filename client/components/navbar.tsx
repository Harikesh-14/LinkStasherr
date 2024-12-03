"use client";

import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Home, PersonStanding, FileQuestion, LogIn, Plus } from 'lucide-react';
import { ModeToggle } from './theme-changer';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext } from '@/context/user-context';

function Navbar() {
  const { user, setUser, isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext)!;
  const [accountMenu, setAccountMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAccountMenu = () => {
    setAccountMenu(!accountMenu);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          setUser(data);
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      })
    })
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountMenu(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
        });
        setIsUserLoggedIn(false);
        // reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Client-side error:', error);
    }
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-opacity-70 backdrop-blur-lg bg-white dark:bg-[#030712] dark:bg-opacity-70 transition-all duration-300 ease-in-out shadow-sm dark:shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className='flex gap-1 items-center text-2xl'>
          <svg className="w-10 h-10 text-[#6D28D9] rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
          </svg>
          <p>LinkStasherr.com</p>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className='flex gap-5 items-center justify-center'>
            <ModeToggle />
            {isUserLoggedIn ? (
              <div ref={dropdownRef} className='relative h-full hidden md:block'>
                <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex justify-center items-center gap-2 text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 dark:text-white" type="button" onClick={handleAccountMenu}>
                  <span className="sr-only">Open user menu</span>
                  <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  </div>
                  {user?.firstName}
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="dropdownAvatarName" className={`absolute top-12 left-0 z-10 ${accountMenu ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="truncate">{user?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                    <li>
                      <Link href="/custom-link" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Custom Link</Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/manage-links" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Manage Links</Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 items-center justify-center">
                <Link href="/login" className="hidden md:block py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">Sign In</Link>
                <Link href="/register" className="hidden md:block py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">Sign Up</Link>
              </div>
            )}
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
                {isUserLoggedIn ? (
                  <div className='relative h-full'>
                    <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex justify-center items-center gap-2 text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 dark:text-white" type="button" onClick={handleAccountMenu}>
                      <span className="sr-only">Open user menu</span>
                      <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                      </div>
                      {user?.firstName}
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>

                    <div id="dropdownAvatarName" className={`absolute top-12 left-0 z-10 ${accountMenu ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="truncate">{user?.email}</div>
                      </div>
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                        <li>
                          <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                        </li>
                        <li>
                          <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 items-center justify-center">
                    <Link href="/login" className="w-[110px] flex items-center justify-center gap-1 py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">
                      <LogIn size={20} />
                      Sign In
                    </Link>
                    <Link href="/register" className="w-[110px] flex items-center justify-center gap-1 py-2 px-3 rounded bg-[#6D28D9] text-white hover:bg-[#4C1D95] duration-300 ease-in-out">
                      <Plus size={20} />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link href="/" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0" aria-current="page"><Home size={20} /> Home</Link>
            </li>
            <li>
              <Link href="/about" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0"><PersonStanding size={20} /> About</Link>
            </li>
            <li>
              <Link href="/faq" className="flex gap-3 items-center py-2 px-3 rounded md:bg-transparent md:p-0"><FileQuestion size={20} /> FAQ</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
