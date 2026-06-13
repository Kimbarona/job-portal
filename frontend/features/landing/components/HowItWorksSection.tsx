const clientSteps = [
  {
    title: "Discover local professionals",
    description: "Search by service, location, and fit.",
  },
  {
    title: "Compare profiles and portfolios",
    description: "Review experience, work examples, ratings, and coverage.",
  },
  {
    title: "Send a detailed inquiry",
    description: "Share the job details and preferred schedule upfront.",
  },
];

const providerSteps = [
  {
    title: "Build your service profile",
    description: "List your services, skills, coverage, and experience.",
  },
  {
    title: "Showcase your work and earn trust",
    description: "Use portfolios and reviews to help clients evaluate fit.",
  },
  {
    title: "Receive qualified inquiries",
    description: "Hear from clients already looking for your type of service.",
  },
];

type Step = (typeof clientSteps)[number];
type StepTone = "client" | "provider";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
            Two simple paths. One trusted marketplace.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <StepList title="For clients" tone="client" steps={clientSteps} />
          <StepList
            delay="100"
            title="For professionals and providers"
            tone="provider"
            steps={providerSteps}
          />
        </div>
      </div>
    </section>
  );
}

function StepList({
  delay,
  steps,
  title,
  tone,
}: {
  delay?: "100";
  steps: Step[];
  title: string;
  tone: StepTone;
}) {
  return (
    <article
      data-reveal
      data-reveal-delay={delay}
      className={[
        "rounded-lg border p-6",
        tone === "client"
          ? "border-blue-100 bg-blue-50/40"
          : "border-orange-100 bg-orange-50/40",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span className={getHeadingMarkClass(tone)} aria-hidden="true" />
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      </div>
      <ol className="relative mt-7 space-y-6">
        <span
          className={[
            "absolute bottom-6 left-4 top-4 w-px",
            tone === "client" ? "bg-blue-200" : "bg-orange-200",
          ].join(" ")}
          aria-hidden="true"
        />
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4">
            <span className={getStepNumberClass(tone)}>{index + 1}</span>
            <span className="pt-0.5">
              <span className="block text-sm font-semibold text-slate-950">
                {step.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">
                {step.description}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function getHeadingMarkClass(tone: StepTone) {
  return [
    "h-2.5 w-2.5 rounded-full",
    tone === "client" ? "bg-blue-600" : "bg-orange-500",
  ].join(" ");
}

function getStepNumberClass(tone: StepTone) {
  return [
    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white shadow-sm",
    tone === "client"
      ? "bg-blue-600 shadow-blue-950/20"
      : "bg-orange-500 shadow-orange-950/20",
  ].join(" ");
}
