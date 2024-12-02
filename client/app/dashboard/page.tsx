"use client";

import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const { toast } = useToast();
  
  // State for form values - moved AFTER user state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          // Update form states when user data is fetched
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        } else {
          console.error(data.message);
        }
      })
    });
  }, []);

  // State for edit modes
  const [isFirstNameEditing, setIsFirstNameEditing] = useState(false);
  const [isLastNameEditing, setIsLastNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  // Handler for starting edit mode
  const handleStartEditing = (field: string) => {
    switch (field) {
      case 'firstName':
        setIsFirstNameEditing(true);
        break;
      case 'lastName':
        setIsLastNameEditing(true);
        break;
      case 'email':
        setIsEmailEditing(true);
        break;
    }
  };

  // Update First Name
  const handleUpdateFirstName = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/firstName`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName }),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'First Name Updated',
            description: 'Your first name has been updated successfully',
          })
        } else {
          console.error(data.message);
        }
      });
    });
  }

  // Update Last Name
  const handleUpdateLastName = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/lastName`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName }),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'First Name Updated',
            description: 'Your last name has been updated successfully',
          })
        } else {
          console.error(data.message);
        }
      });
    });
  }

  // Update email
  const handleUpdateEmail = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/email`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName }),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'First Name Updated',
            description: 'Your email has been updated successfully',
          })
        } else {
          console.error(data.message);
        }
      });
    });
  }

  // Handler for confirming edit
  const handleConfirmEdit = (field: string) => {
    switch (field) {
      case 'firstName':
        setIsFirstNameEditing(false);
        // TODO: Add API call to update first name
        handleUpdateFirstName();

        break;
      case 'lastName':
        setIsLastNameEditing(false);
        // TODO: Add API call to update last name
        break;
      case 'email':
        setIsEmailEditing(false);
        // TODO: Add API call to update email
        break;
    }
  };

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
                  onChange={(e) => setFirstName(e.target.value)}
                  readOnly={!isFirstNameEditing}
                  className={`w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] 
                    ${!isFirstNameEditing ? 'cursor-not-allowed' : ''}`}
                />
              </div>
              <div>
                {!isFirstNameEditing ? (
                  <button
                    onClick={() => handleStartEditing('firstName')}
                    className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleConfirmEdit('firstName')}
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-green-700"
                  >
                    Confirm
                  </button>
                )}
              </div>
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
                  onChange={(e) => setLastName(e.target.value)}
                  readOnly={!isLastNameEditing}
                  className={`w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] 
                    ${!isLastNameEditing ? 'cursor-not-allowed' : ''}`}
                />
              </div>
              <div>
                {!isLastNameEditing ? (
                  <button
                    onClick={() => handleStartEditing('lastName')}
                    className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleConfirmEdit('lastName')}
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-green-700"
                  >
                    Confirm
                  </button>
                )}
              </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEmailEditing}
                  className={`w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED] 
                    ${!isEmailEditing ? 'cursor-not-allowed' : ''}`}
                />
              </div>
              <div>
                {!isEmailEditing ? (
                  <button
                    onClick={() => handleStartEditing('email')}
                    className="mt-6 px-4 py-2 bg-[#6D28D9] text-white rounded-lg focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleConfirmEdit('email')}
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-green-700"
                  >
                    Confirm
                  </button>
                )}
              </div>
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