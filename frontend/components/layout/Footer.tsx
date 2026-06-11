export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-slate-950">WorkBridge</p>
          <p className="mt-1 max-w-xl">
            Helping clients find trusted skilled workers, and helping skilled
            workers build stronger connections with the communities they serve.
          </p>
        </div>
        <p className="text-slate-500">
          &copy; {new Date().getFullYear()} WorkBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
