
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Compass,
  Layers3,
  MonitorSmartphone,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom"; 

import {
  CTASection,
  Eyebrow,
  NumberLabel,
  PrimaryLink,
  Reveal,
  SectionHeading,
  TextLink,
} from "../components/Editorial";

const services = [
  {
    number: "01",
    title: "Web development",
    description:
      "Thoughtful, responsive websites built around your business goals and your customers.",
    icon: MonitorSmartphone,
  },
  {
    number: "02",
    title: "Digital marketing",
    description:
      "A more considered digital presence, from brand messaging to campaign experiences.",
    icon: Compass,
  },
  {
    number: "03",
    title: "SEO",
    description:
      "A stronger foundation for discoverability, useful content and sustainable growth.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "AI & automation",
    description:
      "Practical digital workflows that reduce repetitive work and support better decisions.",
    icon: Braces,
  },
];

const concepts = [
  {
    number: "01",
    category: "Digital experience",
    title: "A better way to shop online.",
    description:
      "An illustrative commerce concept focused on clear product discovery and a simpler buying journey.",
    theme: "commerce",
    label: "Commerce concept",
  },
  {
    number: "02",
    category: "Brand & web",
    title: "A digital home for a modern brand.",
    description:
      "An illustrative brand website exploring typography, storytelling and a confident visual system.",
    theme: "brand",
    label: "Brand concept",
  },
];

const process = [
  ["01", "Understand", "We begin with your goals, audience and the problem worth solving."],
  ["02", "Shape", "We align on the direction, priorities and experience before building."],
  ["03", "Build", "We turn the agreed direction into a responsive, considered experience."],
  ["04", "Refine", "We test, improve and prepare the experience for its next chapter."],
];

function ConceptArtwork({ theme }) {
  if (theme === "commerce") {
    return (
      <div className="relative min-h-[280px] overflow-hidden bg-[#e6e1d7] p-5 sm:min-h-[360px] sm:p-8">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#d4a18e]" />
        <div className="absolute -bottom-16 left-12 h-64 w-64 rounded-full bg-[#b7b8a1]" />
        <div className="relative flex items-center justify-between border-b border-black/15 pb-4">
          <span className="text-xs font-semibold tracking-widest">FORM / OBJECT</span>
          <span className="text-xs">CURATED GOODS</span>
        </div>
        <div className="relative mt-12 max-w-xs">
          <p className="text-xs uppercase tracking-[0.2em]">Less, but better</p>
          <h3 className="mt-3 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Everyday
            <br />
            essentials.
          </h3>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#20201e] px-4 py-3 text-xs font-medium text-white">
            Explore collection <ArrowUpRight size={14} />
          </div>
        </div>
        <div className="absolute bottom-7 right-7 flex h-24 w-24 rotate-[-10deg] items-center justify-center rounded-full border border-black/20 bg-[#faf9f6]/80 text-center text-xs font-semibold leading-4 sm:h-32 sm:w-32">
          MADE FOR
          <br />
          EVERY DAY
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[280px] overflow-hidden bg-[#d9d4c8] p-5 sm:min-h-[360px] sm:p-8">
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#c1272d]" />
      <div className="absolute bottom-0 right-12 h-44 w-44 rounded-t-full bg-[#b6b9a5]" />
      <div className="relative flex items-center justify-between border-b border-black/15 pb-4">
        <span className="text-xs font-semibold tracking-widest">STUDIO / FORM</span>
        <span className="text-xs">IDENTITY STUDY</span>
      </div>
      <div className="relative mt-10 max-w-xs">
        <p className="text-xs uppercase tracking-[0.2em]">A different perspective</p>
        <h3 className="mt-4 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl">
          Shape
          <br />
          the story.
        </h3>
      </div>
      <div className="absolute bottom-7 left-6 rounded-full border border-black/20 px-4 py-2 text-xs">
        IDENTITY / 2026
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#20201e]">
      <section className="px-5 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Eyebrow>Independent thinking. Digital impact.</Eyebrow>
              <span className="text-xs tracking-wide text-neutral-500">
                WORKING WITH AMBITIOUS BUSINESSES
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
            <Reveal>
              <h1 className="max-w-5xl text-[clamp(3.5rem,10vw,8.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                Make your
                <br />
                next move
                <br />
                <span className="text-[#c1272d]">matter.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12} className="pb-2 lg:pb-4">
              <p className="max-w-md text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
                We help businesses turn ambitious ideas into considered
                digital experiences — with strategy, design and technology
                working together.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <PrimaryLink to="/contact">Let's talk</PrimaryLink>
                <TextLink to="/services" arrow="down">
                  Explore what we do
                </TextLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-14 sm:mt-20">
            <div className="grid gap-0 border-y border-neutral-300 sm:grid-cols-3">
              {[
                ["01", "Strategy with purpose"],
                ["02", "Design with clarity"],
                ["03", "Technology that serves"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="flex items-center gap-4 border-b border-neutral-300 py-5 last:border-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <span className="text-xs text-[#c1272d]">{number}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-[#efebe3] px-5 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <Eyebrow>A thoughtful digital partner</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-3xl font-medium leading-[1.22] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              Your business deserves more than a website that simply{" "}
              <span className="text-[#c1272d]">looks the part.</span>
              {" "}It deserves an experience designed around what comes next.
            </p>
            <div className="mt-7">
              <TextLink to="/about">Get to know us</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Good thinking."
              accent="Better execution."
              description="The right combination of digital services to help you create, improve and grow your online presence."
            />
            <Reveal>
              <TextLink to="/services">All services</TextLink>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-neutral-300">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.number}>
                  <Link
                    to="/services"
                    className="group grid gap-4 border-b border-neutral-300 py-7 transition-colors hover:bg-[#efebe3]/70 sm:grid-cols-[70px_1fr_1fr_40px] sm:items-center sm:gap-6 sm:px-4"
                  >
                    <span className="text-sm text-[#c1272d]">
                      {service.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-[#c1272d]"
                      />
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-neutral-600">
                      {service.description}
                    </p>
                    <ArrowUpRight
                      size={21}
                      aria-hidden="true"
                      className="hidden text-[#c1272d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#20201e] px-5 py-16 text-white sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected directions"
              title="Ideas made"
              accent="visible."
              description="A glimpse of possible digital directions. These are illustrative concepts, not representations of completed client projects."
              light
            />
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
                <Sparkles size={15} aria-hidden="true" />
                Concept explorations
              </span>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {concepts.map((concept, index) => (
              <Reveal key={concept.number} delay={index * 0.08}>
                <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <ConceptArtwork theme={concept.theme} />
                  <div className="p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <NumberLabel number={concept.number}>
                        {concept.category}
                      </NumberLabel>
                      <span className="text-[10px] uppercase tracking-widest text-white/45">
                        {concept.label}
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
                      {concept.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">
                      {concept.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Ethixweb"
            title="Digital work with"
            accent="the bigger picture in mind."
            description="Good design is not decoration. It should make things clearer for the people using it and more useful for the business behind it."
          />

          <div className="space-y-0 border-t border-neutral-300">
            {[
              [
                "Clear by design",
                "We make decisions with your audience, your goals and the actual user journey in mind.",
              ],
              [
                "Built around your business",
                "The solution starts with your context rather than a one-size-fits-all template.",
              ],
              [
                "Made for real-world use",
                "Responsive layouts, accessible interactions and performance-conscious implementation.",
              ],
              [
                "A collaborative process",
                "You stay part of the conversation as ideas take shape and priorities become clearer.",
              ],
            ].map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.04}>
                <div className="grid gap-3 border-b border-neutral-300 py-6 sm:grid-cols-[1fr_1.1fr] sm:gap-8">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-600">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efebe3] px-5 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How we work"
            title="From first conversation"
            accent="to finished experience."
            description="A clear process helps turn an early idea into a more focused, useful digital product."
          />

          <div className="mt-12 grid gap-0 border-t border-neutral-300 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, description], index) => (
              <Reveal key={number} delay={index * 0.05}>
                <div className="border-b border-neutral-300 py-6 sm:border-r sm:px-5 sm:first:pl-0 lg:min-h-[235px] lg:border-b-0 lg:first:pl-0 lg:last:border-r-0">
                  <span className="text-sm text-[#c1272d]">{number}</span>
                  <h3 className="mt-7 text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Your next chapter starts here"
        title="Have an idea worth moving forward?"
        description="Tell us where you want to go. We'll help you explore what a thoughtful digital solution could look like."
      />
    </main>
  );
}
