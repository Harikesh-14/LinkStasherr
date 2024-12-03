"use client";

import { UserContext } from '@/context/user-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

interface CustomLink {
  _id: string;
  url: string;
  modifiedUrl: string;
  click: number;
}

export default function ManageLinks() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useContext(UserContext)!;
  
  // State to store custom links
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    // Only fetch links if user.id exists
    if (user.id) {
      const fetchLinks = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/custom-link/get-all/${user.id}`, {
            method: 'GET',
            credentials: 'include',
          });

          const data = await response.json();

          if (Array.isArray(data)) {
            setCustomLinks(data);
          } else {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Invalid response from server',
            });
          }
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to fetch custom links',
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchLinks();
    }
  }, [user.id]);

  // Handler for deleting a link
  const handleDeleteLink = async (linkId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/custom-link/delete/${linkId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted link from the state
        setCustomLinks(prevLinks => prevLinks.filter(link => link._id !== linkId));
        
        toast({
          title: 'Success',
          description: 'Link deleted successfully',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.message || 'Failed to delete link',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete link',
      });
    }
  };

  return (
    <div className="flex flex-col md:w-[60rem] mx-auto h-[calc(100vh-8.05rem)] p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">Manage Links</h1>
      <div className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full bg-white dark:bg-[#111827]">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">S.No</th>
                <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">Original Link</th>
                <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">Modified Link</th>
                <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">Times Opened</th>
                <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">Loading...</td>
                </tr>
              ) : customLinks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No custom links found</td>
                </tr>
              ) : (
                customLinks.map((link, index) => (
                  <tr key={link._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 border-b dark:border-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-700">{link.url}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-700 text-center">{link.modifiedUrl}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-700 text-center">{link.click}</td>
                    <td className="px-4 py-2 border-b dark:border-gray-700">
                      <button 
                        onClick={() => handleDeleteLink(link._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}