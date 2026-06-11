import { SERVICE_CATEGORIES } from "@/features/landing/constants/serviceCategories";

export default function ServiceCategoriesSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Service categories
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Starting with high-demand skilled services.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            These categories are the initial validation set and can expand based
            on survey feedback.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category) => (
            <div
              key={category}
              className="rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-800 shadow-sm"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
