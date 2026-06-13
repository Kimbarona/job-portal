const plannedFeatures = [
  {
    icon: "profile",
    title: "Professional profiles",
    description:
      "Profiles that show services, experience, service areas, and the work clients need to evaluate.",
  },
  {
    icon: "reviews",
    title: "Ratings and reviews",
    description:
      "Trust signals that help clients compare professionals and providers responsibly.",
  },
  {
    icon: "portfolio",
    title: "Portfolio gallery",
    description:
      "Photos, projects, and examples that make skills easier to judge before reaching out.",
  },
  {
    icon: "location",
    title: "Local service discovery",
    description:
      "Help clients find nearby professionals and providers who serve their area.",
  },
  {
    icon: "inquiry",
    title: "Structured inquiries and booking requests",
    description:
      "Clear request details so providers can judge fit before responding.",
  },
  {
    icon: "verification",
    title: "Future verification",
    description:
      "Planned identity, credential, and work-history checks as the marketplace grows.",
  },
] as const;

type FeatureIconName = (typeof plannedFeatures)[number]["icon"];

export default function SolutionSection() {
  return (
    <section id="features" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Planned solution
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
            Marketplace features built around trust, fit, and local discovery.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plannedFeatures.map((feature, index) => (
            <article
              key={feature.title}
              data-reveal
              data-reveal-delay={
                index % 3 === 0 ? undefined : String((index % 3) * 80)
              }
              className={[
                "group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 motion-reduce:transition-none",
                "motion-safe:hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/80",
              ].join(" ")}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-6 text-slate-950">
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

function FeatureIcon({ name }: { name: FeatureIconName }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      {getIconPath(name)}
    </svg>
  );
}

function getIconPath(name: FeatureIconName) {
  const sharedProps = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  switch (name) {
    case "profile":
      return (
        <>
          <path d="M8 7.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" {...sharedProps} />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" {...sharedProps} />
        </>
      );
    case "reviews":
      return (
        <>
          <path d="M12 3.8 14.3 8l4.7.7-3.4 3.3.8 4.7L12 14.5l-4.4 2.2.8-4.7L5 8.7 9.7 8 12 3.8Z" {...sharedProps} />
          <path d="M7 20h10" {...sharedProps} />
        </>
      );
    case "portfolio":
      return (
        <>
          <path d="M4.5 6.5h15v11h-15z" {...sharedProps} />
          <path d="m7 15 3.2-3.2 2.3 2.3 1.6-1.6L17 15" {...sharedProps} />
          <path d="M8 9h.01" {...sharedProps} />
        </>
      );
    case "location":
      return (
        <>
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" {...sharedProps} />
          <path d="M12 10.5h.01" {...sharedProps} />
        </>
      );
    case "inquiry":
      return (
        <>
          <path d="M5 5.5h14v10H8l-3 3v-13Z" {...sharedProps} />
          <path d="M8.5 9h7" {...sharedProps} />
          <path d="M8.5 12h4" {...sharedProps} />
        </>
      );
    case "verification":
      return (
        <>
          <path d="M12 3.5 18 6v5.2c0 3.8-2.5 7.3-6 8.3-3.5-1-6-4.5-6-8.3V6l6-2.5Z" {...sharedProps} />
          <path d="m9 12 2 2 4-4" {...sharedProps} />
        </>
      );
  }
}
