const clientSteps = [
  "Search by service, location, and worker fit.",
  "Review profile details, portfolio, ratings, and coverage.",
  "Send an inquiry with the job details and preferred schedule.",
];

const workerSteps = [
  "Create a profile with skills, experience, and service area.",
  "Show portfolio work and build trust through reviews.",
  "Receive inquiries from clients looking for your service.",
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            A simple flow for clients and skilled workers.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <StepList title="For clients" steps={clientSteps} />
          <StepList title="For skilled workers" steps={workerSteps} />
        </div>
      </div>
    </section>
  );
}

function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-orange-500 text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="pt-1 text-sm leading-6 text-slate-700">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </article>
  );
}
