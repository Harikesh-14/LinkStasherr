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
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/get/${params.link}`);
        
        if (!response.ok) {
          return toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to fetch the original link',
          });
        }
        
        const data = await response.json();
        
        // Redirect to the original link
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
        return toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to redirect to the original link',
        }); 
      }
    }

    fetchOriginalLink();
  }, [params.link, router]);

  // Placeholder content while redirecting
  return (
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
