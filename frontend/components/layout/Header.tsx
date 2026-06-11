import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
            WB
          </span>
          <span className="text-lg font-bold">WorkBridge</span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            How it works
          </Link>
          <Link href="/#survey" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700">
            Survey
          </Link>
        </nav>
        <Link
          href="/#survey"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Early access
        </Link>
      </div>
    </header>
  );
}
