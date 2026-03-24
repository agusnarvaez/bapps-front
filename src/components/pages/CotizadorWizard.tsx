"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { clientConfig } from "@/lib/config/client";

const formSchema = z.object({
  projectType: z.string().min(1),
  description: z.string().min(10),
  features: z.string().optional(),
  reference: z.string().optional(),
  timeline: z.string().min(1),
  budget: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 4;
const CONTACT_EMAIL_FROM = "no_reply@bapps.com.ar";
const CONTACT_EMAIL_TO = "agus.narvaez@outlook.com";

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);
}

function formatOptionalField(value: string | undefined) {
  const normalizedValue = value?.trim();
  if (!normalizedValue) {
    return "-";
  }

  return normalizedValue;
}

const projectTypeIcons: Record<string, React.ReactNode> = {
  webapp: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  ),
  mobile: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  landing: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  ecommerce: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  other: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
};

export default function CotizadorWizard() {
  const t = useTranslations("contact");
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      description: "",
      features: "",
      reference: "",
      timeline: "",
      budget: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const selectedType = watch("projectType");
  const selectedTimeline = watch("timeline");
  const selectedBudget = watch("budget");

  const projectTypes = ["webapp", "mobile", "landing", "ecommerce", "other"];
  const timelineOptions = ["urgent", "1month", "3months", "flexible"];
  const budgetOptions = ["small", "medium", "large", "enterprise", "unknown"];

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["projectType"],
    2: ["description"],
    3: ["timeline", "budget"],
    4: ["name", "email"],
  };

  async function goNext() {
    const valid = await trigger(stepFields[step]);
    if (valid && step < TOTAL_STEPS) setStep(step + 1);
  }

  function goBack() {
    if (step > 1) setStep(step - 1);
  }

  async function onSubmit(data: FormData) {
    setSending(true);
    setSubmitError(null);

    try {
      const mailingApiBaseUrl = clientConfig.mailingApiUrl.replace(/\/$/, "");
      const projectTypeLabel = t(
        `projectTypes.${data.projectType}` as Parameters<typeof t>[0]
      );
      const timelineLabel = t(
        `timelineOptions.${data.timeline}` as Parameters<typeof t>[0]
      );
      const budgetLabel = t(
        `budgetOptions.${data.budget}` as Parameters<typeof t>[0]
      );

      const normalizedName = data.name.trim();
      const normalizedEmail = data.email.trim();
      const normalizedDescription = data.description.trim();
      const normalizedFeatures = formatOptionalField(data.features);
      const normalizedReference = formatOptionalField(data.reference);
      const normalizedPhone = formatOptionalField(data.phone);
      const normalizedCompany = formatOptionalField(data.company);

      const message = [
        "Nuevo contacto desde bapps-front",
        `Nombre: ${normalizedName}`,
        `Email: ${normalizedEmail}`,
        `Telefono: ${normalizedPhone}`,
        `Empresa: ${normalizedCompany}`,
        `Tipo de proyecto: ${projectTypeLabel}`,
        `Descripcion: ${normalizedDescription}`,
        `Funcionalidades deseadas: ${normalizedFeatures}`,
        `Referencia: ${normalizedReference}`,
        `Timeline: ${timelineLabel}`,
        `Presupuesto: ${budgetLabel}`,
      ].join("\n");

      const html = `
        <p><strong>Nuevo contacto desde bapps-front</strong></p>
        <ul>
          <li><strong>Nombre:</strong> ${escapeHtml(normalizedName)}</li>
          <li><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</li>
          <li><strong>Telefono:</strong> ${escapeHtml(normalizedPhone)}</li>
          <li><strong>Empresa:</strong> ${escapeHtml(normalizedCompany)}</li>
          <li><strong>Tipo de proyecto:</strong> ${escapeHtml(projectTypeLabel)}</li>
          <li><strong>Descripcion:</strong> ${escapeHtml(normalizedDescription)}</li>
          <li><strong>Funcionalidades deseadas:</strong> ${escapeHtml(normalizedFeatures)}</li>
          <li><strong>Referencia:</strong> ${escapeHtml(normalizedReference)}</li>
          <li><strong>Timeline:</strong> ${escapeHtml(timelineLabel)}</li>
          <li><strong>Presupuesto:</strong> ${escapeHtml(budgetLabel)}</li>
        </ul>
      `;

      const response = await fetch(`${mailingApiBaseUrl}/mail/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_EMAIL_FROM,
          to: CONTACT_EMAIL_TO,
          subject: `Nuevo contacto web - ${normalizedName}`,
          message,
          html,
        }),
      });

      if (!response.ok) {
        throw new Error(`Mailing API responded with status ${response.status}`);
      }

      setSent(true);
    } catch (error) {
      console.error("Contact form send failed", error);
      setSubmitError(t("error"));
    } finally {
      setSending(false);
    }
  }

  const stepLabels = ["projectType", "details", "timeline", "contactInfo"] as const;

  return (
    <section className="relative min-h-screen pt-32 pb-24">
      {/* Background astronaut */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/home-background-astronaut.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.03]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-foreground-muted">{t("subtitle")}</p>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 mb-10"
        >
          <div className="flex items-center justify-between">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                        isCompleted
                          ? "border-bapps-purple bg-bapps-purple text-white"
                          : isActive
                          ? "border-bapps-purple text-bapps-purple"
                          : "border-border text-foreground-subtle"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`hidden text-xs sm:block ${
                        isActive ? "font-medium text-foreground" : "text-foreground-subtle"
                      }`}
                    >
                      {t(`steps.${label}`)}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`mx-2 h-px flex-1 transition-colors duration-300 ${
                        step > stepNum ? "bg-bapps-purple" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Success state */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-bapps-purple/20 bg-background-secondary p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bapps-purple/10">
              <svg className="h-10 w-10 text-bapps-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-foreground">{t("success")}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-2xl border border-border bg-background-secondary p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Project Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-lg font-semibold text-foreground">
                      {t("steps.projectType")}
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setValue("projectType", type, { shouldValidate: true })}
                          className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                            selectedType === type
                              ? "border-bapps-purple bg-bapps-purple/10 text-bapps-purple-light"
                              : "border-border text-foreground-muted hover:border-border-hover hover:text-foreground"
                          }`}
                        >
                          <div
                            className={`transition-colors ${
                              selectedType === type ? "text-bapps-purple" : "text-foreground-subtle"
                            }`}
                          >
                            {projectTypeIcons[type]}
                          </div>
                          <span className="font-medium">
                            {t(`projectTypes.${type}` as Parameters<typeof t>[0])}
                          </span>
                        </button>
                      ))}
                    </div>
                    {errors.projectType && (
                      <p className="mt-3 text-sm text-red-400">Seleccioná un tipo de proyecto</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-lg font-semibold text-foreground">
                      {t("steps.details")}
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground-muted">
                          {t("fields.description")} *
                        </label>
                        <textarea
                          {...register("description")}
                          rows={4}
                          className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          placeholder="..."
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground-muted">
                          {t("fields.features")}
                        </label>
                        <textarea
                          {...register("features")}
                          rows={3}
                          className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          placeholder="..."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground-muted">
                          {t("fields.reference")}
                        </label>
                        <input
                          {...register("reference")}
                          type="text"
                          className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Timeline & Budget */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-lg font-semibold text-foreground">
                      {t("steps.timeline")}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-foreground-muted">
                          {t("fields.timeline")} *
                        </label>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {timelineOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setValue("timeline", opt, { shouldValidate: true })}
                              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                selectedTimeline === opt
                                  ? "border-bapps-purple bg-bapps-purple/10 text-bapps-purple-light"
                                  : "border-border text-foreground-muted hover:border-border-hover hover:text-foreground"
                              }`}
                            >
                              {t(`timelineOptions.${opt}` as Parameters<typeof t>[0])}
                            </button>
                          ))}
                        </div>
                        {errors.timeline && (
                          <p className="mt-2 text-sm text-red-400">{errors.timeline.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-3 block text-sm font-medium text-foreground-muted">
                          {t("fields.budget")} *
                        </label>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {budgetOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setValue("budget", opt, { shouldValidate: true })}
                              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                selectedBudget === opt
                                  ? "border-bapps-purple bg-bapps-purple/10 text-bapps-purple-light"
                                  : "border-border text-foreground-muted hover:border-border-hover hover:text-foreground"
                              }`}
                            >
                              {t(`budgetOptions.${opt}` as Parameters<typeof t>[0])}
                            </button>
                          ))}
                        </div>
                        {errors.budget && (
                          <p className="mt-2 text-sm text-red-400">{errors.budget.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact info */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-6 text-lg font-semibold text-foreground">
                      {t("steps.contactInfo")}
                    </h2>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground-muted">
                            {t("fields.name")} *
                          </label>
                          <input
                            {...register("name")}
                            type="text"
                            className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground-muted">
                            {t("fields.email")} *
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground-muted">
                            {t("fields.phone")}
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground-muted">
                            {t("fields.company")}
                          </label>
                          <input
                            {...register("company")}
                            type="text"
                            className="w-full rounded-xl border border-border bg-background-tertiary px-4 py-3 text-foreground placeholder-foreground-subtle transition-colors focus:border-bapps-purple focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground-muted transition-all hover:border-border-hover hover:text-foreground"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    {t("back")}
                  </button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2 rounded-full bg-bapps-purple px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-bapps-purple-dark hover:shadow-lg hover:shadow-bapps-purple/25"
                  >
                    {t("next")}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center gap-2 rounded-full bg-bapps-yellow px-8 py-2.5 text-sm font-bold text-background transition-all duration-300 hover:bg-bapps-yellow-dark hover:shadow-lg hover:shadow-bapps-yellow/25 disabled:opacity-50"
                  >
                    {sending ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    ) : null}
                    {t("submit")}
                  </button>
                )}
              </div>

              {submitError ? (
                <p role="alert" className="mt-4 text-sm font-medium text-red-400">
                  {submitError}
                </p>
              ) : null}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
