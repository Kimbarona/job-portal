const faqs = [
  {
    question: "Is WorkBridge available now?",
    answer:
      "Not yet. WorkBridge is under development, and this landing page is collecting early feedback before the first public release.",
  },
  {
    question: "Who can join?",
    answer:
      "Clients looking for skilled workers, skilled workers looking for more clients, and people who fit both roles can answer the survey.",
  },
  {
    question: "Is it free to answer the survey?",
    answer:
      "Yes. The survey is free and helps prioritize which services, trust features, and booking flows should be built first.",
  },
  {
    question: "How will workers be verified in the future?",
    answer:
      "Verification is planned as a future feature. It may include profile checks, service credentials, portfolio review, and customer feedback signals.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Questions before you answer.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-xl leading-none text-orange-500 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
