"use client";

import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';

const CustomLink = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const { toast } = useToast();

  const handleGenerateLink = async () => {
    // Validation
    if (!originalUrl || !customUrl) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both original and custom URL',
      });
      return;
    }

    try {
      // Validate original URL
      new URL(originalUrl);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl, modifiedUrl: customUrl }),
      });

      if (response.ok) {
        setGeneratedLink(`${process.env.NEXT_PUBLIC_CLIENT_URL}/${customUrl}`);
        toast({
          variant: 'default',
          title: 'Success',
          description: 'Custom link generated successfully',
        });

        setOriginalUrl('');
        setCustomUrl('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to generate custom link',
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid URL',
      });
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      
      toast({
        variant: 'default',
        title: 'Copied',
        description: 'Link copied to clipboard',
      });
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-center gap-5 px-4 py-8">
      <div className="relative mt-[4.3rem]">
        <div className="w-full bg-black dark:opacity-80">
          <img
            src="/about-us-hero-section.png"
            alt="About us hero section"
            className="w-full h-96 object-cover object-center"
          />
        </div>
        <div className="absolute w-full px-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#7C3AED] mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Custom Link Generator
          </h2>
          <p className="mt-2 text-4xl text-gray-300 font-bold leading-10 tracking-tight sm:text-5xl sm:leading-none">
            Generate your own custom
          </p>
        </div>
      </div>
      <div className="w-full max-w-md p-8 md:mt-16">
        <div className="space-y-4">
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium mb-2">
              Original URL
            </label>
            <input
              type="text"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="customUrl" className="block text-sm font-medium mb-2">
              Custom URL Suffix
            </label>
            <div className="flex items-center">
              <span className="text-[#7C3AED] mr-2 font-medium">{process.env.NEXT_PUBLIC_CLIENT_URL}/</span>
              <input
                type="text"
                id="customUrl"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="your-custom-link"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateLink}
            className="w-full bg-[#7C3AED] hover:bg-[#6c32d1] text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-101 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate Custom Link
          </button>
        </div>

        {generatedLink && (
          <div className='mt-10'>
            <h1 className="block text-2xl text-center font-medium mb-2">
              Generated Custom Link
            </h1>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6c32d1] rounded-md transition duration-300 ease-in-out"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomLink;