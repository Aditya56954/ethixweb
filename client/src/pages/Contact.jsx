
import { useState } from "react";
import axios from "axios";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  Eyebrow,
  Reveal,
  SectionHeading,
} from "../components/Editorial";

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const services = [
  "Web Development",
  "Digital Marketing",
  "SEO",
  "AI & Automation",
  "Design",
  "Other",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-400 focus:border-[#c1272d] focus:ring-4 focus:ring-red-100";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5001/api"
).replace(/\/+$/, "");

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const prefersReducedMotion = useReducedMotion();

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
    setSubmitError("");
  }

  function validate() {
    const nextErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      nextErrors.name = "Please enter your name (at least 2 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (message.length < 10) {
      nextErrors.message = "Please provide at least 10 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setSubmitted(false);
    setSubmitError("");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      service: form.service,
      message: form.message.trim(),
      website: "",
    };

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${API_URL}/enquiries`,
        payload,
        {
          timeout: 30000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.data?.success === true
      ) {
        setSubmitted(true);
        setForm(initialForm);
        setErrors({});
      } else {
        setSubmitError(
          response.data?.message ||
            "The server did not confirm your enquiry. Please try again."
        );
      }
    } catch (error) {
      console.error("Enquiry submission failed:", {
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });

      if (error.code === "ECONNABORTED") {
        setSubmitError(
          "The service is waking up. Please wait a moment and try submitting again."
        );
      } else if (!error.response) {
        setSubmitError(
          "We couldn't connect to the enquiry service. Please try again."
        );
      } else {
        setSubmitError(
          error.response.data?.message ||
            `Submission failed (HTTP ${error.response.status}). Please try again.`
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#20201e]">
      <section className="px-5 pb-12 pt-14 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Contact / Start a conversation</Eyebrow>

            <h1 className="mt-8 max-w-6xl text-[clamp(3.5rem,9.5vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
              Let's talk about
              <br />
              <span className="text-[#c1272d]">what's possible.</span>
            </h1>

            <div className="mt-9 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Every good project starts somewhere.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
                Tell us about your business, an idea you're exploring
                or something you'd like to improve. You don't need
                a perfect brief — just a place to start.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-[#efebe3] px-5 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              title: "Start with context",
              text: "Share your goals and what you want to achieve.",
            },
            {
              icon: ShieldCheck,
              title: "Share only what's needed",
              text: "Please leave passwords and sensitive details out.",
            },
            {
              icon: Clock3,
              title: "A conversation first",
              text: "We'll have the information needed to understand your enquiry.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full border-b border-neutral-300 pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5 sm:last:border-r-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-300 bg-[#faf9f6] text-[#c1272d]">
                    <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-24">
            <Eyebrow>Your next step</Eyebrow>

            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              A clearer brief begins with a few good questions.
            </h2>

            <p className="mt-5 leading-7 text-neutral-600">
              Tell us what you're trying to do, who it's for and
              what you need help with. Share as much context as
              you're comfortable providing.
            </p>

            <div className="mt-8 border-t border-neutral-300 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Helpful to include
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Your business or project",
                  "The challenge you want to solve",
                  "Your goals or priorities",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-neutral-600"
                  >
                    <CheckCircle2
                      size={17}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#c1272d]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c1272d]">
                  Your enquiry
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell us about your project.
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  Fields marked with * are required.
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="mb-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">Enquiry received.</p>
                    <p className="mt-1">
                      Thanks for reaching out. Your enquiry has been
                      submitted successfully.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <div
                  role="alert"
                  className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                >
                  <AlertCircle
                    size={20}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.name}
                      onChange={updateField}
                      placeholder="Enter your name"
                      className={inputClass}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-sm text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Work email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@company.com"
                      className={inputClass}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-700">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="text-sm font-medium">
                    Company name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={150}
                    value={form.company}
                    onChange={updateField}
                    placeholder="Your company (optional)"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="text-sm font-medium">
                    What can we help with? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={updateField}
                    className={inputClass}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                  >
                    <option value="">Choose a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p
                      id="service-error"
                      className="mt-2 text-sm text-red-700"
                    >
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    value={form.message}
                    onChange={updateField}
                    placeholder="What are you looking to build or improve?"
                    className={`${inputClass} resize-y`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-sm text-red-700"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#c1272d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a51e24] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      />
                      Sending enquiry...
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </button>

                <p className="text-xs leading-5 text-neutral-500">
                  Your enquiry is sent securely to our application backend
                  for processing. Please don't include passwords or other
                  sensitive information.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#efebe3] px-5 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="No perfect brief required"
            title="Start with what you know."
            accent="We can work from there."
            description="A business goal, an unfinished idea or a challenge that's been around too long — they're all useful starting points."
          />
        </div>
      </section>
    </main>
  );
}
