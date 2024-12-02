"use client";

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const { toast } = useToast();
  const router = useRouter();

  // State for form values - moved AFTER user state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/check-login`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (!data.authenticated) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: data.message || 'Please login to continue',
          });
          router.push('/login');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to check user authentication',
        });
      }
    };

    checkAuth();
  }, []);

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
      body: JSON.stringify({ lastName }),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'Last Name Updated',
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
      body: JSON.stringify({ email }),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'Email Updated',
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
        handleUpdateFirstName();
        break;
      case 'lastName':
        setIsLastNameEditing(false);
        handleUpdateLastName();
        break;
      case 'email':
        setIsEmailEditing(false);
        handleUpdateEmail();
        break;
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  }

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast({
        variant: 'destructive',
        title: 'Error',
        description: 'New password and confirm password do not match',
      });
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update/password`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    }).then(response => {
      response.json().then(data => {
        if (response.ok) {
          toast({
            variant: 'default',
            title: 'Password Updated',
            description: 'Your password has been updated successfully',
          })
        } else {
          console.error(data.message);
        }
      });
    });
  }

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

        <p
          className={`text-sm text-gray-500 mt-4 dark:text-gray-400 before:content-['*'] before:text-red-600 before:font-bold before:mr-1`}
        >
          You might need to logout and login again to see the changes in effect.
        </p>

        {/* Change Password Section */}
        <form
          className="p-6"
          onSubmit={handleUpdatePassword}
        >
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
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED]"
                value={passwordData.currentPassword}
                onChange={handleChangePassword}
                name='currentPassword'
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
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED]"
                value={passwordData.newPassword}
                onChange={handleChangePassword}
                name='newPassword'
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
                className="w-full rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-3 py-2 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED]"
                value={passwordData.confirmPassword}
                onChange={handleChangePassword}
                name='confirmPassword'
              />
            </div>

            {/* Change Password Button */}
            <div className="pt-4">
              <button
                type='submit'
                className="w-full bg-[#6D28D9] text-white rounded-lg py-2 focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}