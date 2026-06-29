import Link from "next/link";

const serviceCategories = [
  {
    title: "Home repairs",
    description: "Electrical, plumbing, carpentry, appliance support.",
    signal: "Fast response",
  },
  {
    title: "Cleaning",
    description: "Move-in, office, recurring, post-renovation cleaning.",
    signal: "Verified teams",
  },
  {
    title: "Events",
    description: "Styling, photography, catering, coordination, rentals.",
    signal: "Portfolio-led",
  },
  {
    title: "Digital help",
    description: "Design, websites, content, bookkeeping, admin support.",
    signal: "Remote-ready",
  },
];

const workers = [
  {
    initials: "MR",
    name: "Mara Reyes",
    skill: "Home electrical specialist",
    location: "Quezon City",
    rating: "4.98",
    reviews: 86,
    completedJobs: 142,
    completionRate: "99%",
    specialties: ["Lighting repair", "Panel checks", "Safety audit"],
    badges: ["ID verified", "Portfolio reviewed", "Top rated"],
    review:
      "Mara diagnosed the issue quickly, explained every option, and left the workspace cleaner than she found it.",
    gallery: ["Panel tune-up", "Pendant lights", "Outdoor outlet"],
    accent: "from-blue-600 to-emerald-500",
  },
  {
    initials: "DL",
    name: "Dion Lim",
    skill: "Custom furniture maker",
    location: "Makati",
    rating: "4.95",
    reviews: 64,
    completedJobs: 97,
    completionRate: "98%",
    specialties: ["Built-ins", "Repairs", "Space-saving storage"],
    badges: ["Materials checked", "Repeat clients", "Insured"],
    review:
      "The shelves were measured perfectly and finished ahead of schedule. The craftsmanship feels premium.",
    gallery: ["Walnut desk", "Kitchen shelf", "Closet repair"],
    accent: "from-orange-500 to-sky-500",
  },
  {
    initials: "AS",
    name: "Ari Santos",
    skill: "Event photographer",
    location: "Pasig",
    rating: "4.97",
    reviews: 73,
    completedJobs: 118,
    completionRate: "100%",
    specialties: ["Portraits", "Product shoots", "Small events"],
    badges: ["Fast delivery", "Gallery samples", "Background checked"],
    review:
      "Ari captured natural moments without making anyone feel staged. The gallery was ready the next day.",
    gallery: ["Cafe launch", "Team portraits", "Product set"],
    accent: "from-slate-700 to-orange-500",
  },
];

const steps = [
  {
    title: "Search by service",
    description:
      "Start with a category, location, or specific task and compare available professionals.",
  },
  {
    title: "Review trusted profiles",
    description:
      "Check ratings, specialties, verification badges, project previews, and recent customer feedback.",
  },
  {
    title: "Request the service",
    description:
      "Send the job details, preferred schedule, and location so the worker can confirm fit and availability.",
  },
];

const faqs = [
  {
    question: "Can I book a worker directly today?",
    answer:
      "This marketplace preview shows the planned experience. Registration and booking flows will be connected in a later release.",
  },
  {
    question: "How are workers verified?",
    answer:
      "The first version will combine profile review, identity checks, portfolio signals, completion history, and customer reviews.",
  },
  {
    question: "Can skilled workers join now?",
    answer:
      "The planned worker registration path is `/register/worker`. The route is intentionally not created yet.",
  },
  {
    question: "What services will launch first?",
    answer:
      "Early categories prioritize home services, practical repairs, cleaning, event support, and digital help based on demand.",
  },
];

export default function MarketplacePage() {
  return (
    <div className="bg-white text-slate-950">
      <HeroSection />
      <SearchVisualSection />
      <ServiceCategoriesSection />
      <WorkerSpotlightSection />
      <HowItWorksSection />
      <AudienceSplitSection />
      <TrustSafetySection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-orange-300">
            WorkBridge Marketplace
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Find trusted skilled workers by profile, proof, and fit.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Compare local professionals using verified profile signals,
            practical service details, real customer feedback, and project
            previews before you request help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register/client"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-950/30 transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
            >
              Get Started
            </Link>
            <Link
              href="/register/worker"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Join as a Worker
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-slate-950/40">
          <div className="rounded-lg bg-slate-100 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Suggested match
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">
                  Electrical repair
                </p>
              </div>
              <span className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-800">
                12 available
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {["Verified", "4.9+ rating", "Within 8 km"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-sm font-semibold text-slate-700"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <Metric value="4.96" label="avg rating" />
            <Metric value="420+" label="jobs shown" />
            <Metric value="98%" label="completion" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchVisualSection() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
          <SearchField label="Service" value="Home repair, cleaning, design..." />
          <SearchField label="Location" value="City or neighborhood" />
          <Link
            href="/register/client"
            className="inline-flex min-h-14 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Search workers
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCategoriesSection() {
  return (
    <section id="marketplace-services" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Service categories"
          title="Start broad, then compare by proof."
          description="Each category is designed around worker profiles, service scope, location fit, and trust signals."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <span className="h-4 w-4 rounded-sm bg-current" />
              </div>
              <h2 className="mt-5 text-lg font-bold text-slate-950">
                {category.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {category.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-orange-700">
                {category.signal}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkerSpotlightSection() {
  return (
    <section id="marketplace-workers" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Worker Spotlight"
          title="Profiles built for confident comparison."
          description="Every spotlight combines service skill, location, proof of work, performance metrics, verification signals, and review context."
        />
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {workers.map((worker) => (
            <article
              key={worker.name}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div
                  className={[
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg font-bold text-white",
                    worker.accent,
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {worker.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-slate-950">
                    {worker.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-blue-700">
                    {worker.skill}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{worker.location}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric value={worker.rating} label={`${worker.reviews} reviews`} />
                <Metric value={String(worker.completedJobs)} label="jobs done" />
                <Metric value={worker.completionRate} label="complete" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {worker.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-2">
                {worker.badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {badge}
                  </div>
                ))}
              </div>

              <blockquote className="mt-5 border-l-4 border-orange-400 pl-4 text-sm leading-6 text-slate-600">
                "{worker.review}"
              </blockquote>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {worker.gallery.map((item, index) => (
                  <div
                    key={item}
                    className="flex aspect-[4/3] items-end rounded-lg bg-slate-100 p-2 text-xs font-semibold text-slate-700"
                  >
                    <span>{index + 1}. {item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/register/client"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  View Profile
                </Link>
                <Link
                  href="/register/client"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Request Service
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="marketplace-how-it-works" className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="A clearer path from need to trusted help."
          description="The marketplace flow keeps search, comparison, and service requests focused on practical decision signals."
          inverted
        />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-lg border border-white/10 bg-white/5 p-5"
            >
              <span className="text-sm font-bold text-orange-300">
                Step {index + 1}
              </span>
              <h2 className="mt-3 text-xl font-bold">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSplitSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <AudiencePanel
          title="For clients"
          description="Shortlist workers using ratings, service fit, locations, project previews, and verified profile details before you send a request."
          ctaHref="/register/client"
          ctaLabel="Register as Client"
          items={["Compare profiles", "Request services", "Track trusted signals"]}
        />
        <AudiencePanel
          title="For skilled workers"
          description="Show your specialties, proof of work, service areas, reviews, and availability so better-fit clients can find you."
          ctaHref="/register/worker"
          ctaLabel="Register as Worker"
          items={["Build a profile", "Show project galleries", "Receive relevant requests"]}
        />
      </div>
    </section>
  );
}

function TrustSafetySection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trust and safety"
          title="Designed to make service decisions less uncertain."
          description="WorkBridge prioritizes visible proof, scoped requests, and clear signals before payment or booking workflows arrive."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {[
            "Identity and profile checks",
            "Review and completion signals",
            "Project previews and service scope",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm"
            >
              <span className="mb-4 block h-1 w-10 rounded-full bg-orange-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="marketplace-faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Marketplace questions"
          description="A quick view of what this preview represents and where registration will connect next."
        />
        <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {faqs.map((faq) => (
            <details key={faq.question} className="group open:bg-white">
              <summary className="cursor-pointer list-none px-5 py-4 text-base font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-orange-500 group-open:hidden">+</span>
                  <span className="hidden text-orange-500 group-open:block">-</span>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-blue-700 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          Ready to see how WorkBridge will connect local services?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-50">
          Join from the side that fits you. The registration routes are reserved
          for the upcoming auth flow.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register/client"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inverted?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={[
          "text-sm font-semibold uppercase",
          inverted ? "text-orange-300" : "text-blue-700",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <h2
        className={[
          "mt-3 text-3xl font-bold leading-tight sm:text-4xl",
          inverted ? "text-white" : "text-slate-950",
        ].join(" ")}
      >
        {title}
      </h2>
      <p
        className={[
          "mt-4 text-base leading-7",
          inverted ? "text-slate-300" : "text-slate-600",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );
}

function SearchField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-slate-100 px-3 py-3">
      <p className="text-lg font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function AudiencePanel({
  title,
  description,
  ctaHref,
  ctaLabel,
  items,
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  items: string[];
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
