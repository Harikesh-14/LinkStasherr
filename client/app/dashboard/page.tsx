"use client";

import React, { useState } from 'react';

export default function Dashboard() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto overflow-hidden">
        {/* Profile Information Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
          
          <div className="space-y-4">
            {/* First Name */}
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  readOnly
                  className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
                />
              </div>
              <button
                className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
              >
                Update
              </button>
            </div>

            {/* Last Name */}
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  readOnly
                  className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
                />
              </div>
              <button
                className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
              >
                Update
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly
                  className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
                />
              </div>
              <button
                className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 mt-5">Change Password</h2>
          
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter current password"
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] cursor-not-allowed"
              />
            </div>

            {/* Change Password Button */}
            <div className="pt-4">
              <button
                className="w-full bg-[#6D28D9] text-white rounded-lg py-2 focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}