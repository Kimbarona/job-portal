const faqs = [
  {
    question: "Is WorkBridge available now?",
    answer:
      "Not yet. WorkBridge is under development, and this landing page is collecting early access feedback before the first public release.",
  },
  {
    question: "Who can join early access?",
    answer:
      "Clients, trade and home-service professionals, freelancers, creatives, event providers, digital specialists, and local service businesses can join early access.",
  },
  {
    question: "Is WorkBridge only for trade workers?",
    answer:
      "No. WorkBridge is also being shaped for freelancers, creatives, event providers, digital specialists, rental providers, and other local service businesses.",
  },
  {
    question: "Is the early access survey free?",
    answer:
      "Yes. The survey is free and helps prioritize which services, trust features, and inquiry flows should be built first.",
  },
  {
    question: "How will professionals be verified in the future?",
    answer:
      "Verification is planned as a future feature. It may include profile checks, service credentials, portfolio review, and customer feedback signals.",
  },
  {
    question: "How will my information be used?",
    answer:
      "Your contact details will only be used for WorkBridge early access updates, product research, and relevant follow-up about your response.",
  },
  {
    question: "Which locations will WorkBridge support first?",
    answer:
      "Early locations will be guided by survey demand, service availability, and where WorkBridge can build enough trusted local supply for clients.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Learn more about WorkBridge, early access, and how the marketplace
            will work.
          </p>
        </div>
        <div
          className="mt-7 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm"
          data-reveal
          data-reveal-delay="80"
        >
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-slate-200 last:border-b-0 open:bg-orange-50/35"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-base font-semibold text-slate-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500 sm:px-5">
                <span className="flex items-center justify-between gap-5">
                  <span>{faq.question}</span>
                  <span
                    className="relative flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition-colors group-open:text-orange-500"
                    aria-hidden="true"
                  >
                    <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition duration-200 motion-reduce:transition-none group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </span>
              </summary>
              <p className="px-4 pb-4 text-sm leading-6 text-slate-600 sm:px-5 sm:pb-5">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
