"use client"

import { FaLink, FaChartLine, FaPenFancy } from 'react-icons/fa';

export default function Features({title}: {title: string}) {
  return (
    <div className="w-full max-w-screen-xl my-10 mx-auto p-5">
      <h1 className="text-4xl font-extrabold text-center text-purple-600">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <FeatureCard
          icon={<FaLink className="text-purple-600 text-4xl" />}
          title="Link Shortening"
          description="Shorten your links with ease and share them with the world."
        />
        <FeatureCard
          icon={<FaChartLine className="text-purple-600 text-4xl" />}
          title="Link Analytics"
          description="Track how your links are performing and see detailed insights."
        />
        <FeatureCard
          icon={<FaPenFancy className="text-purple-600 text-4xl" />}
          title="Custom Links"
          description="Create custom links and make them more memorable."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) {
  return (
    <div
      className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-800 cursor-pointer"
    >
      <div
        className="flex items-center justify-center mb-4"
      >
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-purple-600 text-center">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-3 text-center">{description}</p>
    </div>
  );
}