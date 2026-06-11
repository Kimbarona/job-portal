const audiences = [
  {
    title: "For clients",
    description:
      "Find skilled workers for repairs, maintenance, installations, and practical project work without relying only on scattered referrals.",
    points: [
      "Compare service areas and skills",
      "Review past work before reaching out",
      "Send inquiries with the job details upfront",
    ],
  },
  {
    title: "For skilled workers",
    description:
      "Build a stronger online presence and receive more qualified inquiries from clients who are already looking for your service.",
    points: [
      "Show your skills and experience",
      "Share portfolio photos and service coverage",
      "Prepare for future bookings and reviews",
    ],
  },
];

export default function AudienceSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Who is this for?
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Built for both sides of local skilled work.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {audience.description}
              </p>
              <ul className="mt-6 space-y-3">
                {audience.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
