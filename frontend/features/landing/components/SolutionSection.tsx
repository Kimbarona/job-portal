const plannedFeatures = [
  {
    title: "Worker profiles",
    description: "A clear place to show skills, service areas, and experience.",
  },
  {
    title: "Ratings and reviews",
    description: "Trust signals that help clients compare workers responsibly.",
  },
  {
    title: "Portfolio gallery",
    description: "Photos and examples of completed work for faster evaluation.",
  },
  {
    title: "Location-based search",
    description: "Find nearby workers who cover the client's area.",
  },
  {
    title: "Booking and inquiry requests",
    description: "Structured requests so workers receive better job details.",
  },
  {
    title: "Future verification",
    description: "Planned identity and credential checks as the marketplace grows.",
  },
];

export default function SolutionSection() {
  return (
    <section id="features" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Planned solution
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Practical marketplace features, focused on trust and fit.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plannedFeatures.map((feature, index) => (
            <article
              key={feature.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-sm font-bold text-blue-700">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
