'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function DynamicRedirect({
  params: paramsPromise,
}: {
  params: Promise<{ link: string }>
}) {
  const { toast } = useToast();
  const router = useRouter();
  const params = use(paramsPromise);

  useEffect(() => {
    async function fetchOriginalLink() {
      try {
        // First, try to fetch from custom-link/get
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/custom-link/get/${params.link}`);
        let data;

        if (response.ok) {
          data = await response.json();
          if (data.url) {
            // Redirect to the original link from custom-link/get
            window.location.href = data.url;
            return;
          }
        }

        // If custom-link/get fails or does not return a valid URL, try link/get
        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/get/${params.link}`);
        
        if (!response.ok) {
          return toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to fetch the original link',
          });
        }

        data = await response.json();
        
        // Redirect to the original link from link/get
        if (data.url) {
          window.location.href = data.url;
        } else {
          return toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to fetch the original link',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchOriginalLink();
  }, [params.link, router, toast]);

  // Placeholder content while redirecting
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
