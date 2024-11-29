"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          if (errorData.message === "User not found") {
            return toast({
              variant: "destructive",
              title: "Error",
              description: errorData.message,
            });
          } else if (errorData.message === "Invalid credentials") {
            return toast({
              variant: "destructive",
              title: "Error",
              description: errorData.message,
            });
          } else {
            return toast({
              variant: "destructive",
              title: "Error",
              description: "An unexpected error occurred",
            });
          }
        } else {
          const errorText = await response.text();
          return toast({
            variant: "destructive",
            title: "Error",
            description: errorText,
          });
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Client-side error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-[25rem] md:w-[30rem] mx-auto flex flex-col items-center justify-center mt-32 mb-10 space-y-5 dark:text-white border border-gray-200 dark:border-gray-700 p-5 rounded-lg">
      <div className="w-full">
        <div className="relative w-14 h-14 mx-auto overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-16 h-16 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username@email.com"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="text-white bg-[#6D28D9] hover:bg-[#5c22bb] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#6D28D9] dark:hover:bg-[#5c22bb] dark:focus:ring-[#46198e]">
            Sign In
          </button>
        </div>

        <hr className="mt-5" />

        <div>
          <p className="mt-5 text-center text-sm font-medium text-gray-900 dark:text-gray-300">Don't have an account? <Link href="/register" className="text-[#6D28D9] dark:text-[#6D28D9]">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
}