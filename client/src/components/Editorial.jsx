
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion ? false : { opacity: 0, y: 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        light ? "text-white/65" : "text-[#c1272d]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          light ? "bg-white" : "bg-[#c1272d]"
        }`}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  light = false,
}) {
  return (
    <Reveal className="max-w-3xl">
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}

      <h2
        className={`mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-[#20201e]"
        }`}
      >
        {title}{" "}
        {accent && (
          <span className={light ? "text-[#ffb8ad]" : "text-[#c1272d]"}>
            {accent}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            light ? "text-white/65" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function TextLink({
  to,
  children,
  light = false,
  arrow = "up",
}) {
  const Icon =
    arrow === "down"
      ? ArrowDownRight
      : arrow === "right"
        ? ArrowRight
        : ArrowUpRight;

  return (
    <Link
      to={to}
      className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors ${
        light
          ? "text-white hover:text-[#ffb8ad]"
          : "text-[#c1272d] hover:text-[#9e1d23]"
      }`}
    >
      {children}
      <Icon
        size={17}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}

export function PrimaryLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c1272d] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a51e24] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
    >
      {children}
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

export function NumberLabel({ number, children }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
      <span className="text-[#c1272d]">{number}</span>
      <span>{children}</span>
    </div>
  );
}

export function CTASection({
  eyebrow = "Have a project in mind?",
  title = "Let's make your next move count.",
  description = "Tell us what you're building. We'll start with a conversation about your goals.",
}) {
  return (
    <section className="bg-[#c1272d] px-5 py-16 text-white sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            to="/contact"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#faf9f6] px-6 py-3 text-sm font-semibold text-[#20201e] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            Start a conversation
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
