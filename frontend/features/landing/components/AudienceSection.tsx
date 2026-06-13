const audiences = [
  {
    tone: "client",
    title: "For clients",
    description:
      "Find trusted local help for home projects, events, creative work, digital needs, and practical services without relying only on scattered referrals.",
    points: [
      "Discover services beyond word of mouth",
      "Compare skills, past work, and service areas",
      "Send clear inquiries from the start",
    ],
  },
  {
    tone: "provider",
    title: "For professionals and service providers",
    description:
      "Build a stronger local presence, show your work, and receive better-fit inquiries from clients looking for your services.",
    points: [
      "Show services, portfolio, and coverage",
      "Build trust before the first conversation",
      "Receive inquiries that match your work",
    ],
  },
] as const;

type AudienceTone = (typeof audiences)[number]["tone"];

export default function AudienceSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Who is this for?
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
            Built for clients and local professionals.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {audiences.map((audience, index) => (
            <article
              key={audience.title}
              data-reveal
              data-reveal-delay={index === 0 ? undefined : "100"}
              className={getCardClass(audience.tone)}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                <span className={getIconFrameClass(audience.tone)}>
                  <AudienceIcon tone={audience.tone} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-slate-950">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {audience.description}
                  </p>
                  <ul className="mt-6 grid gap-3">
                    {audience.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span
                          className={getBenefitMarkerClass(audience.tone)}
                          aria-hidden="true"
                        >
                          <CheckIcon />
                        </span>
                        <span className="min-w-0 leading-6">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCardClass(tone: AudienceTone) {
  const toneClass =
    tone === "client"
      ? "border-blue-100 bg-blue-50/45 hover:border-blue-200 hover:shadow-blue-950/10"
      : "border-orange-100 bg-orange-50/45 hover:border-orange-200 hover:shadow-orange-950/10";

  return [
    "rounded-lg border p-6 shadow-sm transition duration-300 motion-reduce:transition-none",
    "motion-safe:hover:-translate-y-0.5 hover:shadow-lg",
    toneClass,
  ].join(" ");
}

function getIconFrameClass(tone: AudienceTone) {
  return [
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
    tone === "client"
      ? "bg-blue-600 text-white shadow-sm shadow-blue-950/20"
      : "bg-orange-500 text-white shadow-sm shadow-orange-950/20",
  ].join(" ");
}

function getBenefitMarkerClass(tone: AudienceTone) {
  return [
    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
    tone === "client"
      ? "bg-blue-100 text-blue-700"
      : "bg-orange-100 text-orange-700",
  ].join(" ");
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        d="m3 6 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function AudienceIcon({ tone }: { tone: AudienceTone }) {
  if (tone === "client") {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m20 20-4.5-4.5m2.5-5A7.5 7.5 0 1 1 3 10.5a7.5 7.5 0 0 1 15 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 18.5V6.8c0-.7.6-1.3 1.3-1.3h11.4c.7 0 1.3.6 1.3 1.3v11.7M7.5 18.5v-3.2c0-.7.6-1.3 1.3-1.3h6.4c.7 0 1.3.6 1.3 1.3v3.2M8.5 9h7M8.5 11.5h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
