import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Welcome to Job Portal
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Find your dream job or hire the best talent. A modern platform
        connecting candidates and employers.
      </p>
      <div className="flex gap-4">
        <Link
          href="/health"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Check API Status
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
