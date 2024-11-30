"use client";

import { Scissors, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export default function LinkInput() {
  const { toast } = useToast();
  const [link, setLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');

  const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const randomString = Math.random().toString(36).substring(2, 10);
    setShortenedLink(randomString);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: link, modifiedUrl: randomString }),
      });

      if (response.ok) {
        setLink('');
        toast({
          variant: 'default',
          title: 'Success',
          description: 'Link shortened successfully',
        });
      } else {
        console.error('Failed to shorten the link');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CLIENT_URL}/${shortenedLink}`);
    toast({
      variant: 'default',
      title: 'Copied',
      description: 'Link copied to clipboard',
    });
  }

  return (
    <section className="w-full md:w-[35rem] mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[#6D28D9] dark:text-[#A78BFA]">Shorten Your Links</h1>
        <p className="text-gray-600 mt-2 dark:text-gray-400">
          Paste your link below to shorten it
        </p>
      </div>
      <form className="mt-8 flex flex-col md:flex-row items-center" onSubmit={handleLinkSubmit}>
        <input
          type="text"
          placeholder="Paste your link here"
          className="w-full md:mr-3 md:w-3/4 rounded-lg border border-[#6D28D9] focus:outline-none focus:border-[#7C3AED] transition duration-200 px-4 py-3 dark:bg-[#111827] dark:border-gray-700 dark:text-gray-100 dark:focus:border-[#7C3AED]"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button
          type="submit"
          className="flex gap-2 items-center justify-center w-full md:w-1/4 mt-4 md:mt-0 bg-[#6D28D9] text-white rounded-lg py-3 focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]"
        >
          <Scissors size={20} className="inline-block" />
          Shorten
        </button>
      </form>

      {shortenedLink && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">
            Your shortened link is:
          </p>
          <div className='w-1/2 flex gap-2 justify-center items-center'>
            <input
              type="text"
              id="disabled-input-2"
              aria-label="disabled input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${shortenedLink}`}
              readOnly
            />
            <button
              className='flex gap-2 items-center justify-center mt-4 md:mt-0 bg-[#6D28D9] text-white rounded-lg p-2 focus:outline-none transition duration-200 hover:bg-[#7C3AED] dark:bg-[#7C3AED] dark:hover:bg-[#8B5CF6]'
              onClick={handleCopyToClipboard}
            >
              <Copy size={20} className="inline-block" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}