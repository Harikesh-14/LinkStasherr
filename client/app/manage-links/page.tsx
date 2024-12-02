"use client";

import React from 'react';

export default function ManageLinks() {
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
          <th className="px-4 py-3 text-left border-b dark:border-gray-700 sticky top-0">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-4 py-2 border-b dark:border-gray-700">{index + 1}</td>
            <td className="px-4 py-2 border-b dark:border-gray-700">https://example.com/original-link-{index + 1}</td>
            <td className="px-4 py-2 border-b dark:border-gray-700">https://short.ly/abcd{index + 1}</td>
            <td className="px-4 py-2 border-b dark:border-gray-700">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-red-600">
              Delete
            </button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}