import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
      <p className="text-xl text-gray-500 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white bg-[#6D28D9] hover:bg-[#5b22b7] rounded-md transition"
      >
        Return Home
      </Link>
    </div>
  )
}