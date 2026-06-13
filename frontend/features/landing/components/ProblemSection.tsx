const clientProblems = [
  "Hard to know which professional is reliable before the job starts.",
  "Recommendations are scattered across messages, social posts, groups, and word of mouth.",
  "Comparing availability, service area, past work, and fit takes too much effort.",
];

const providerProblems = [
  "Good providers often depend on referrals, social posts, and messages that are hard to scale.",
  "Creative work, trade experience, and service quality are not always visible to new clients.",
  "Inquiries can be vague, unqualified, or outside the provider's service area.",
];

export default function ProblemSection() {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            The problem
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Local services still run on trust, but trust is hard to verify
            online.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Clients want confidence before hiring. Professionals, freelancers,
            and service providers want better reach without losing time on
            poor-fit inquiries. WorkBridge is being shaped around that gap.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <ProblemCard
            delay="80"
            tone="client"
            title="Clients face"
            items={clientProblems}
          />
          <ProblemCard
            delay="160"
            tone="provider"
            title="Providers face"
            items={providerProblems}
          />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  delay,
  items,
  title,
  tone,
}: {
  delay: "80" | "160";
  items: string[];
  title: string;
  tone: "client" | "provider";
}) {
  return (
    <article
      data-reveal
      data-reveal-delay={delay}
      className={[
        "rounded-lg border border-t-2 border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/20",
        tone === "client" ? "border-t-blue-400/80" : "border-t-orange-300/80",
      ].join(" ")}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span
              className={[
                "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full",
                tone === "client" ? "bg-blue-300" : "bg-orange-300",
              ].join(" ")}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
