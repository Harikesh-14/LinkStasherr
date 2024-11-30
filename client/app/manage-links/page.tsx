"use client";

import React from 'react';

export default function ManageLinks() {
  return (
    <div className="mt-20 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Links</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 dark:bg-[#111827] dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b dark:border-gray-700">S.No</th>
              <th className="px-4 py-2 border-b dark:border-gray-700">Original Link</th>
              <th className="px-4 py-2 border-b dark:border-gray-700">Modified Link</th>
              <th className="px-4 py-2 border-b dark:border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b dark:border-gray-700">1</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://example.com/original-link-1</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://short.ly/abcd1</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b dark:border-gray-700">2</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://example.com/original-link-2</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://short.ly/abcd2</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b dark:border-gray-700">3</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://example.com/original-link-3</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">https://short.ly/abcd3</td>
              <td className="px-4 py-2 border-b dark:border-gray-700">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
