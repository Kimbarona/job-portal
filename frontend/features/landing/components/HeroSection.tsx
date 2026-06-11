import Link from "next/link";

const marketSignals = [
  { label: "Nearby workers", value: "Location-first" },
  { label: "Trust signals", value: "Reviews planned" },
  { label: "Early access", value: "Feedback open" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(30,64,175,0.38),transparent_45%),linear-gradient(180deg,rgba(249,115,22,0.16),transparent_42%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,32rem)] lg:items-center lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-lg border border-orange-300/30 bg-orange-400/10 px-3 py-2 text-sm font-medium text-orange-100">
            WorkBridge is under development and collecting early feedback
          </div>
          <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Find trusted skilled workers, or get discovered by clients who need
            your work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            WorkBridge is a planned skilled workers marketplace for practical
            home, repair, installation, and trade services. Help shape the
            product by answering a short early access survey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#survey"
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition-colors hover:bg-orange-600"
            >
              Join early access
            </Link>
            <Link
              href="/#features"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View planned features
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xl justify-self-center lg:max-w-[32rem] lg:justify-self-end">
          <div className="overflow-hidden rounded-lg border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-orange-200">
                  Marketplace preview
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Match requests with skilled workers near you
                </p>
              </div>
              <div className="shrink-0 rounded-md bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Soon
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {marketSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-lg border border-white/10 bg-slate-900/70 p-3"
                >
                  <p className="text-xs text-white/55">{signal.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {["Plumbing repair", "Aircon maintenance", "Custom carpentry"].map(
                (request, index) => (
                  <div
                    key={request}
                    className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/10 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-500/25 text-sm font-bold text-blue-100">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{request}</p>
                        <p className="text-xs text-white/55">
                          Profile, portfolio, and inquiry flow planned
                        </p>
                      </div>
                    </div>
                    <span className="w-fit shrink-0 rounded-md bg-white/10 px-2 py-1 text-xs text-orange-100">
                      Match
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
