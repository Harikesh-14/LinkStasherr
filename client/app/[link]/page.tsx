'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function DynamicRedirect({
  params: paramsPromise,
}: {
  params: Promise<{ link: string }>
}) {
  const router = useRouter();
  const params = use(paramsPromise);

  useEffect(() => {
    async function fetchOriginalLink() {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/link/get/${params.link}`);
        
        if (!response.ok) {
          throw new Error(`Link not found: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        
        // Redirect to the original link
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Original URL not found in the response');
        }
      } catch (error) {
        console.error('Redirection failed:', error);
        // Optionally handle error (e.g., show error page)
        router.push('/error');
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
