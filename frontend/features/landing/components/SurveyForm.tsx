"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { isAxiosError } from "axios";
import { SERVICE_CATEGORIES } from "@/features/landing/constants/serviceCategories";
import { surveyResponseService } from "@/features/landing/services/surveyResponses";
import type {
  SurveyInterest,
  SurveyResponsePayload,
  SurveySubmissionData,
  SurveyUserType,
} from "@/features/landing/types/survey";

interface SurveyFormState {
  name: string;
  email: string;
  mobile: string;
  location: string;
  user_type: SurveyUserType;
  needed_services: string[];
  finding_worker_pain_point: string;
  workbridge_likelihood: string;
  important_feature: string;
  offered_service_skill: string;
  years_experience: string;
  service_area: string;
  online_profile_interest: SurveyInterest;
  inquiries_bookings_interest: SurveyInterest;
  trust_concerns_feedback: string;
  desired_features_feedback: string;
  concerns_suggestions: string;
  website: string;
}

interface ValidationErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const importantFeatureOptions = [
  "Verified worker profiles",
  "Ratings and reviews",
  "Portfolio/gallery",
  "Location-based search",
  "Fast inquiry or booking requests",
  "Clear pricing or estimates",
];

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
const labelClass = "text-sm font-medium text-slate-800";
const helpClass = "mt-1 text-xs leading-5 text-slate-500";

function createInitialForm(): SurveyFormState {
  return {
    name: "",
    email: "",
    mobile: "",
    location: "",
    user_type: "client",
    needed_services: [],
    finding_worker_pain_point: "",
    workbridge_likelihood: "",
    important_feature: "",
    offered_service_skill: "",
    years_experience: "",
    service_area: "",
    online_profile_interest: "maybe",
    inquiries_bookings_interest: "maybe",
    trust_concerns_feedback: "",
    desired_features_feedback: "",
    concerns_suggestions: "",
    website: "",
  };
}

function emptyToUndefined(value: string): string | undefined {
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeErrors(errors: Record<string, string[]>): Record<string, string> {
  return Object.entries(errors).reduce<Record<string, string>>(
    (normalized, [field, messages]) => {
      const normalizedField = field.includes(".") ? field.split(".")[0] : field;
      normalized[normalizedField] = messages[0] ?? "This field is invalid.";

      return normalized;
    },
    {}
  );
}

export default function SurveyForm() {
  const [form, setForm] = useState<SurveyFormState>(createInitialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SurveySubmissionData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const isClientResponse =
    form.user_type === "client" || form.user_type === "both";
  const isWorkerResponse =
    form.user_type === "skilled_worker" || form.user_type === "both";

  function clearFieldError(field: string) {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];

      return nextErrors;
    });
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    clearFieldError(name);
  }

  function handleUserTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const userType = event.target.value as SurveyUserType;
    setForm((currentForm) => ({
      ...currentForm,
      user_type: userType,
      needed_services:
        userType === "skilled_worker" ? [] : currentForm.needed_services,
    }));
    clearFieldError("user_type");
    clearFieldError("needed_services");
    clearFieldError("offered_service_skill");
  }

  function handleServiceToggle(service: string) {
    setForm((currentForm) => {
      const serviceExists = currentForm.needed_services.includes(service);

      return {
        ...currentForm,
        needed_services: serviceExists
          ? currentForm.needed_services.filter((item) => item !== service)
          : [...currentForm.needed_services, service],
      };
    });
    clearFieldError("needed_services");
  }

  function buildPayload(): SurveyResponsePayload {
    return {
      name: form.name.trim(),
      email: emptyToUndefined(form.email),
      mobile: emptyToUndefined(form.mobile),
      location: form.location.trim(),
      user_type: form.user_type,
      needed_services: isClientResponse ? form.needed_services : undefined,
      finding_worker_pain_point: isClientResponse
        ? emptyToUndefined(form.finding_worker_pain_point)
        : undefined,
      workbridge_likelihood: isClientResponse && form.workbridge_likelihood
        ? Number(form.workbridge_likelihood)
        : undefined,
      important_feature: isClientResponse
        ? emptyToUndefined(form.important_feature)
        : undefined,
      offered_service_skill: isWorkerResponse
        ? emptyToUndefined(form.offered_service_skill)
        : undefined,
      years_experience: isWorkerResponse && form.years_experience
        ? Number(form.years_experience)
        : undefined,
      service_area: isWorkerResponse
        ? emptyToUndefined(form.service_area)
        : undefined,
      online_profile_interest: isWorkerResponse
        ? form.online_profile_interest
        : undefined,
      inquiries_bookings_interest: isWorkerResponse
        ? form.inquiries_bookings_interest
        : undefined,
      trust_concerns_feedback: isWorkerResponse
        ? emptyToUndefined(form.trust_concerns_feedback)
        : undefined,
      desired_features_feedback: emptyToUndefined(
        form.desired_features_feedback
      ),
      concerns_suggestions: emptyToUndefined(form.concerns_suggestions),
      source: "landing_page",
      website: form.website,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(null);
    setErrors({});
    setStatusMessage(null);

    try {
      const response = await surveyResponseService.submit(buildPayload());
      setSubmitted(response.data.data);
      setForm(createInitialForm());
    } catch (error) {
      if (isAxiosError<ValidationErrorResponse>(error)) {
        const response = error.response;

        if (response?.status === 422 && response.data.errors) {
          setErrors(normalizeErrors(response.data.errors));
          setStatusMessage(
            response.data.message ??
              "Please review the highlighted fields and try again."
          );

          return;
        }
      }

      setStatusMessage(
        "We could not submit your response right now. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="survey" className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            Early access survey
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Help shape WorkBridge before launch.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Tell us what you need as a client, skilled worker, or both. Your
            answers will guide the first marketplace features and service
            categories.
          </p>
          <div className="mt-8 rounded-lg border border-orange-300/25 bg-orange-400/10 p-4 text-sm leading-6 text-orange-50">
            We&apos;ll only use your contact details for WorkBridge early access
            updates and research follow-up.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/10 bg-white p-5 text-slate-950 shadow-2xl sm:p-6"
        >
          {submitted && (
            <div
              className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
              role="status"
            >
              Thanks for your feedback. Your response was received as survey
              #{submitted.id}.
            </div>
          )}

          {statusMessage && (
            <div
              className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {statusMessage}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" error={errors.name} required>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className={inputClass}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>

            <Field
              label="Location"
              htmlFor="location"
              error={errors.location}
              required
            >
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="City or service area"
                aria-invalid={Boolean(errors.location)}
              />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
              />
            </Field>

            <Field label="Mobile" htmlFor="mobile" error={errors.mobile}>
              <input
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Optional if email is provided"
                aria-invalid={Boolean(errors.mobile)}
              />
            </Field>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="user_type">
                I am answering as <span className="text-orange-600">*</span>
              </label>
              <select
                id="user_type"
                name="user_type"
                value={form.user_type}
                onChange={handleUserTypeChange}
                className={inputClass}
                aria-invalid={Boolean(errors.user_type)}
              >
                <option value="client">Client looking for skilled workers</option>
                <option value="skilled_worker">
                  Skilled worker looking for clients
                </option>
                <option value="both">Both</option>
              </select>
              <FieldError error={errors.user_type} />
            </div>
          </div>

          {isClientResponse && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-950">
                Client needs
              </h3>
              <div className="mt-5">
                <p className={labelClass}>
                  Needed services <span className="text-orange-600">*</span>
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {SERVICE_CATEGORIES.map((service) => (
                    <label
                      key={service}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={form.needed_services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-700"
                      />
                      {service}
                    </label>
                  ))}
                </div>
                <FieldError error={errors.needed_services} />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Pain point when finding skilled workers"
                  htmlFor="finding_worker_pain_point"
                  error={errors.finding_worker_pain_point}
                >
                  <textarea
                    id="finding_worker_pain_point"
                    name="finding_worker_pain_point"
                    value={form.finding_worker_pain_point}
                    onChange={handleInputChange}
                    className={`${inputClass} min-h-28`}
                    aria-invalid={Boolean(errors.finding_worker_pain_point)}
                  />
                </Field>

                <div className="grid gap-5">
                  <Field
                    label="Likelihood of using WorkBridge"
                    htmlFor="workbridge_likelihood"
                    error={errors.workbridge_likelihood}
                  >
                    <select
                      id="workbridge_likelihood"
                      name="workbridge_likelihood"
                      value={form.workbridge_likelihood}
                      onChange={handleInputChange}
                      className={inputClass}
                      aria-invalid={Boolean(errors.workbridge_likelihood)}
                    >
                      <option value="">Select a rating</option>
                      <option value="5">5 - Very likely</option>
                      <option value="4">4 - Likely</option>
                      <option value="3">3 - Maybe</option>
                      <option value="2">2 - Unlikely</option>
                      <option value="1">1 - Not interested</option>
                    </select>
                  </Field>

                  <Field
                    label="Most important feature"
                    htmlFor="important_feature"
                    error={errors.important_feature}
                  >
                    <select
                      id="important_feature"
                      name="important_feature"
                      value={form.important_feature}
                      onChange={handleInputChange}
                      className={inputClass}
                      aria-invalid={Boolean(errors.important_feature)}
                    >
                      <option value="">Select a feature</option>
                      {importantFeatureOptions.map((feature) => (
                        <option key={feature} value={feature}>
                          {feature}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            </div>
          )}

          {isWorkerResponse && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-950">
                Skilled worker details
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Offered service or skill"
                  htmlFor="offered_service_skill"
                  error={errors.offered_service_skill}
                  required
                >
                  <input
                    id="offered_service_skill"
                    name="offered_service_skill"
                    value={form.offered_service_skill}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Example: Electrician"
                    aria-invalid={Boolean(errors.offered_service_skill)}
                  />
                </Field>

                <Field
                  label="Years of experience"
                  htmlFor="years_experience"
                  error={errors.years_experience}
                >
                  <input
                    id="years_experience"
                    name="years_experience"
                    type="number"
                    min="0"
                    max="80"
                    value={form.years_experience}
                    onChange={handleInputChange}
                    className={inputClass}
                    aria-invalid={Boolean(errors.years_experience)}
                  />
                </Field>

                <Field
                  label="Service area"
                  htmlFor="service_area"
                  error={errors.service_area}
                >
                  <input
                    id="service_area"
                    name="service_area"
                    value={form.service_area}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Cities or neighborhoods covered"
                    aria-invalid={Boolean(errors.service_area)}
                  />
                </Field>

                <Field
                  label="Interested in an online profile?"
                  htmlFor="online_profile_interest"
                  error={errors.online_profile_interest}
                >
                  <select
                    id="online_profile_interest"
                    name="online_profile_interest"
                    value={form.online_profile_interest}
                    onChange={handleInputChange}
                    className={inputClass}
                    aria-invalid={Boolean(errors.online_profile_interest)}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </Field>

                <Field
                  label="Interested in inquiries/bookings?"
                  htmlFor="inquiries_bookings_interest"
                  error={errors.inquiries_bookings_interest}
                >
                  <select
                    id="inquiries_bookings_interest"
                    name="inquiries_bookings_interest"
                    value={form.inquiries_bookings_interest}
                    onChange={handleInputChange}
                    className={inputClass}
                    aria-invalid={Boolean(errors.inquiries_bookings_interest)}
                  >
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                  </select>
                </Field>

                <Field
                  label="Trust concerns or feedback"
                  htmlFor="trust_concerns_feedback"
                  error={errors.trust_concerns_feedback}
                >
                  <textarea
                    id="trust_concerns_feedback"
                    name="trust_concerns_feedback"
                    value={form.trust_concerns_feedback}
                    onChange={handleInputChange}
                    className={`${inputClass} min-h-28`}
                    aria-invalid={Boolean(errors.trust_concerns_feedback)}
                  />
                </Field>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Open feedback
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="What do you want to see in WorkBridge?"
                htmlFor="desired_features_feedback"
                error={errors.desired_features_feedback}
              >
                <textarea
                  id="desired_features_feedback"
                  name="desired_features_feedback"
                  value={form.desired_features_feedback}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-28`}
                  aria-invalid={Boolean(errors.desired_features_feedback)}
                />
              </Field>

              <Field
                label="Concerns or suggestions"
                htmlFor="concerns_suggestions"
                error={errors.concerns_suggestions}
              >
                <textarea
                  id="concerns_suggestions"
                  name="concerns_suggestions"
                  value={form.concerns_suggestions}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-28`}
                  aria-invalid={Boolean(errors.concerns_suggestions)}
                />
              </Field>
            </div>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              value={form.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit early access survey"}
            </button>
            <p className={helpClass}>
              Email or mobile is required so the WorkBridge team can follow up
              when early access is ready.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  children,
  error,
  htmlFor,
  label,
  required = false,
}: {
  children: ReactNode;
  error?: string;
  htmlFor?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={htmlFor}>
        {label}
        {required && <span className="text-orange-600"> *</span>}
      </label>
      {children}
      <FieldError error={error} />
    </div>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="mt-2 text-xs font-medium text-red-600">{error}</p>;
}
