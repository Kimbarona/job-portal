const clientProblems = [
  "Hard to know which worker is reliable before the job starts.",
  "Recommendations are scattered across messages, groups, and word of mouth.",
  "Comparing availability, location, and past work takes too much effort.",
];

const workerProblems = [
  "Good workers often depend on referrals that are hard to scale.",
  "Past work is not always visible to new clients.",
  "Inquiries can be vague, unqualified, or outside the worker's service area.",
];

export default function ProblemSection() {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            The problem
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Local skilled work still runs on trust, but trust is hard to verify
            online.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Clients want confidence before hiring. Skilled workers want better
            reach without losing time on poor-fit inquiries. WorkBridge is being
            shaped around that gap.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <ProblemCard title="Clients face" items={clientProblems} />
          <ProblemCard title="Workers face" items={workerProblems} />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/10 p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-slate-300">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
