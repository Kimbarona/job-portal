import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          JobPortal
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/health"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Health
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
