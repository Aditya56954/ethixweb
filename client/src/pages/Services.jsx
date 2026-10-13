
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChartNoAxesCombined,
  Check,
  Compass,
  Layers3,
  MonitorSmartphone,
  Palette,
  Search,
  Workflow,
} from "lucide-react";
import {
  CTASection,
  Eyebrow,
  NumberLabel,
  Reveal,
  SectionHeading,
  TextLink,
} from "../components/Editorial";

const services = [
  {
    number: "01",
    icon: MonitorSmartphone,
    title: "Web development",
    description:
      "Digital experiences designed to turn a first visit into a meaningful next step.",
    detail:
      "From your first landing page to a full-scale business website, we focus on clarity, usability, and performance.",
    deliverables: [
      "Business and marketing websites",
      "Responsive user interfaces",
      "Web applications and dashboards",
      "Performance and accessibility improvements",
    ],
    tag: "Build your digital foundation",
    tone: "light",
  },
  {
    number: "02",
    icon: Palette,
    title: "UI/UX & digital design",
    description:
      "Thoughtful interfaces that make complex things feel simple.",
    detail:
      "We bring structure to your ideas through intuitive journeys, consistent visual systems, and purposeful design decisions.",
    deliverables: [
      "Website and app interface design",
      "User journeys and wireframes",
      "Design systems and components",
      "Prototypes and interaction design",
    ],
    tag: "Make every interaction count",
    tone: "dark",
  },
  {
    number: "03",
    icon: Search,
    title: "Search engine optimisation",
    description:
      "Help the right people discover your business when they need you.",
    detail:
      "A considered approach to search visibility that combines useful content, technical foundations, and relevant search intent.",
    deliverables: [
      "Technical SEO foundations",
      "On-page optimisation",
      "Keyword and content planning",
      "Search performance monitoring",
    ],
    tag: "Be easier to discover",
    tone: "light",
  },
  {
    number: "04",
    icon: ChartNoAxesCombined,
    title: "Digital marketing",
    description:
      "Make your online presence work harder for your business.",
    detail:
      "Build a more consistent digital presence with focused campaigns, clear messaging, and measurable goals.",
    deliverables: [
      "Campaign and channel planning",
      "Landing page optimisation",
      "Audience and content strategy",
      "Performance reporting",
    ],
    tag: "Turn attention into action",
    tone: "light",
  },
  {
    number: "05",
    icon: Braces,
    title: "AI & automation",
    description:
      "Use technology to reduce repetitive work and create better workflows.",
    detail:
      "Identify practical opportunities for automation and build tools around real business needs, not technology for its own sake.",
    deliverables: [
      "Workflow automation",
      "AI-powered business tools",
      "API and service integrations",
      "Process improvement",
    ],
    tag: "Work smarter, not harder",
    tone: "dark",
  },
  {
    number: "06",
    icon: Layers3,
    title: "Digital strategy",
    description:
      "Get clarity on what to build, what to prioritise, and what comes next.",
    detail:
      "Connect your business goals to a focused digital roadmap, so every decision has a purpose.",
    deliverables: [
      "Digital opportunity mapping",
      "Project scope and priorities",
      "Customer journey planning",
      "Roadmaps and next steps",
    ],
    tag: "Start with the right questions",
    tone: "light",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn about your business, audience, challenges, and what success should look like.",
  },
  {
    number: "02",
    title: "Shape",
    description:
      "We turn the brief into a clear direction, a considered scope, and shared priorities.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "We design, build, and refine the solution around the people who will actually use it.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "We identify opportunities to learn, iterate, and make the experience work better over time.",
  },
];

export default function Services() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#20201e]">
      {/* HERO */}
      <section className="px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[6.6rem]">
              Good ideas
              <br />
              deserve
              <br />
              <span className="text-[#c1272d]">great execution.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="lg:pb-3">
            <div className="border-l-2 border-[#c1272d] pl-6 sm:pl-8">
              <p className="max-w-lg text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
                We bring strategy, design, and technology together to help
                businesses build a stronger digital presence.
              </p>

              <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
                No unnecessary complexity. No technology for its own sake.
                Just thoughtful work built around your goals.
              </p>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#c1272d] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a51e24] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                >
                  Find the right service
                  <ArrowDownRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* EDITORIAL STRIP */}
        <Reveal className="mx-auto mt-16 max-w-7xl sm:mt-24">
          <div className="grid grid-cols-2 border-y border-neutral-200 py-5 sm:grid-cols-4 sm:py-6">
            {[
              "Strategy first",
              "Design with purpose",
              "Technology that fits",
              "Built around people",
            ].map((item, index) => (
              <div
                key={item}
                className={`flex items-center gap-2 py-2 text-xs font-medium text-neutral-600 sm:text-sm ${
                  index > 1 ? "sm:justify-end" : ""
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c1272d]" />
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section
        id="our-services"
        className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeading
              eyebrow="Our capabilities"
              title="Everything should"
              accent="work together."
              description="Choose the support you need today, or bring us a bigger challenge that calls for a combination of skills."
            />

            <Reveal className="lg:justify-self-end">
              <p className="max-w-sm text-sm leading-7 text-neutral-500">
                Every project is different. We start by understanding the
                problem before deciding which tools, people, and services
                belong in the solution.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              const dark = service.tone === "dark";

              return (
                <Reveal key={service.number} delay={(index % 2) * 0.07}>
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 lg:p-9 ${
                      dark
                        ? "border-[#292927] bg-[#252523] text-white hover:bg-[#2d2d2a]"
                        : "border-neutral-200 bg-white text-[#20201e] hover:border-[#c1272d]/40 hover:shadow-xl hover:shadow-neutral-900/[0.04]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl ${
                          dark
                            ? "bg-white/10 text-[#ffb8ad]"
                            : "bg-[#f8e9e6] text-[#c1272d]"
                        }`}
                      >
                        <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                      </div>

                      <span
                        className={`text-sm font-medium tabular-nums ${
                          dark ? "text-white/35" : "text-neutral-400"
                        }`}
                      >
                        {service.number}
                      </span>
                    </div>

                    <p
                      className={`mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        dark ? "text-[#ffb8ad]" : "text-[#c1272d]"
                      }`}
                    >
                      {service.tag}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                      {service.title}
                    </h3>

                    <p
                      className={`mt-4 text-base font-medium leading-7 ${
                        dark ? "text-white/85" : "text-neutral-700"
                      }`}
                    >
                      {service.description}
                    </p>

                    <p
                      className={`mt-3 text-sm leading-7 ${
                        dark ? "text-white/55" : "text-neutral-500"
                      }`}
                    >
                      {service.detail}
                    </p>

                    <div
                      className={`my-7 h-px ${
                        dark ? "bg-white/10" : "bg-neutral-200"
                      }`}
                    />

                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.15em] ${
                        dark ? "text-white/55" : "text-neutral-500"
                      }`}
                    >
                      What this can include
                    </p>

                    <ul className="mt-4 grid gap-3">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className={`flex items-start gap-3 text-sm leading-6 ${
                            dark ? "text-white/75" : "text-neutral-600"
                          }`}
                        >
                          <Check
                            size={16}
                            className={`mt-1 shrink-0 ${
                              dark ? "text-[#ffb8ad]" : "text-[#c1272d]"
                            }`}
                            aria-hidden="true"
                          />
                          {deliverable}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <Link
                        to="/contact"
                        className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors ${
                          dark
                            ? "text-white hover:text-[#ffb8ad]"
                            : "text-[#c1272d] hover:text-[#9e1d23]"
                        }`}
                      >
                        Discuss this service
                        <ArrowUpRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-[#eeece5] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title="Less guesswork."
              accent="More intention."
              description="A good outcome starts with the right questions, clear expectations, and a shared understanding of the goal."
            />

            <Reveal className="mt-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-neutral-300 bg-white/60 px-4 py-3 text-sm text-neutral-600">
                <Compass size={18} className="text-[#c1272d]" />
                One clear step at a time
              </div>
            </Reveal>
          </div>

          <div className="border-t border-neutral-300">
            {process.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04}>
                <div className="grid gap-3 border-b border-neutral-300 py-6 sm:grid-cols-[65px_1fr] sm:gap-5 sm:py-8">
                  <span className="text-sm font-semibold tabular-nums text-[#c1272d]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATION */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-neutral-200 bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <Reveal>
            <Eyebrow>A good place to start</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl">
              Not sure what your project needs?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
              You do not need a perfect brief. Tell us where your business is
              today and what you would like to improve. We can work out the
              next step together.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c1272d] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a51e24] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
            >
              Let's talk
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Your next chapter starts here"
        title="Let's build something that moves you forward."
        description="Bring us a challenge, an idea, or a goal. We'll start with a conversation."
      />
    </main>
  );
}
