import { SERVICE_CATEGORY_GROUPS } from "@/features/landing/constants/serviceCategories";

type CategoryIconName = (typeof SERVICE_CATEGORY_GROUPS)[number]["icon"];

export default function ServiceCategoriesSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Service categories
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Services for homes, businesses, events, and digital work.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            WorkBridge is starting with practical local services and expanding
            based on early client and provider feedback.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORY_GROUPS.map((category, index) => (
            <article
              key={category.title}
              data-reveal
              data-reveal-delay={
                index % 4 === 0
                  ? undefined
                  : String((index % 4) * 60)
              }
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <CategoryIcon name={category.icon} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-950">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {category.examples}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({ name }: { name: CategoryIconName }) {
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

function getIconPath(name: CategoryIconName) {
  const sharedProps = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  switch (name) {
    case "home":
      return (
        <>
          <path d="m4 10 8-6 8 6" {...sharedProps} />
          <path d="M6.5 9v10h11V9" {...sharedProps} />
          <path d="M10 19v-5h4v5" {...sharedProps} />
        </>
      );
    case "trade":
      return (
        <>
          <path d="m14.5 6.5 3 3" {...sharedProps} />
          <path d="m4.5 19.5 9.5-9.5 3 3-9.5 9.5h-3v-3Z" {...sharedProps} />
          <path d="M13 5.5 18.5 11" {...sharedProps} />
        </>
      );
    case "cleaning":
      return (
        <>
          <path d="M8 4h8l-1 6H9L8 4Z" {...sharedProps} />
          <path d="M10 10v8" {...sharedProps} />
          <path d="M14 10v8" {...sharedProps} />
          <path d="M7 20h10" {...sharedProps} />
        </>
      );
    case "mechanical":
      return (
        <>
          <path d="M7.5 15.5 4 19" {...sharedProps} />
          <path d="M15.5 7.5 19 4" {...sharedProps} />
          <path d="M8 8a5.7 5.7 0 0 0 8 8l-3-3 2-2 3 3a5.7 5.7 0 0 0-8-8l3 3-2 2-3-3Z" {...sharedProps} />
        </>
      );
    case "creative":
      return (
        <>
          <path d="M5 17.5 15.5 7 17 8.5 6.5 19H5v-1.5Z" {...sharedProps} />
          <path d="m14.5 8 1.5-1.5a1.4 1.4 0 0 1 2 2L16.5 10" {...sharedProps} />
          <path d="M6 6h.01M9 4h.01M4 10h.01" {...sharedProps} />
        </>
      );
    case "events":
      return (
        <>
          <path d="M5 12a7 7 0 0 1 14 0v5a2 2 0 0 1-2 2h-2v-7h4" {...sharedProps} />
          <path d="M5 12h4v7H7a2 2 0 0 1-2-2v-5Z" {...sharedProps} />
          <path d="M12 5v3" {...sharedProps} />
        </>
      );
    case "digital":
      return (
        <>
          <path d="M4.5 6.5h15v10h-15z" {...sharedProps} />
          <path d="M8 20h8" {...sharedProps} />
          <path d="M12 16.5V20" {...sharedProps} />
          <path d="m9 10 2 2-2 2" {...sharedProps} />
          <path d="M13 14h2" {...sharedProps} />
        </>
      );
    case "other":
      return (
        <>
          <path d="M12 4.5v15" {...sharedProps} />
          <path d="M4.5 12h15" {...sharedProps} />
          <path d="M7 7h10v10H7z" {...sharedProps} />
        </>
      );
  }
}
