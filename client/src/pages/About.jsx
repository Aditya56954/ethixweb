
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  Eye,
  Handshake,
  Lightbulb,
  MoveUpRight,
  Target,
  Users,
} from "lucide-react";
import {
  CTASection,
  Eyebrow,
  Reveal,
  SectionHeading,
} from "../components/Editorial";

const principles = [
  {
    number: "01",
    icon: Target,
    title: "Purpose over noise",
    description:
      "Every decision should serve a clear goal. We focus on the work that makes a meaningful difference instead of adding complexity for its own sake.",
  },
  {
    number: "02",
    icon: Eye,
    title: "Clarity in everything",
    description:
      "Good digital experiences make the next step obvious. We value clear communication, intuitive design, and solutions people can understand.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Partnership, not hand-offs",
    description:
      "The best work comes from working together. We believe in open conversations, shared expectations, and taking the time to understand your business.",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Curiosity with purpose",
    description:
      "Technology keeps changing. We stay curious, question assumptions, and choose tools because they solve a problem—not simply because they are new.",
  },
];

const commitments = [
  {
    title: "Understand first",
    description:
      "Learn about the people, context, and business goals behind every brief.",
  },
  {
    title: "Make it useful",
    description:
      "Create experiences that are accessible, intuitive, and built around real needs.",
  },
  {
    title: "Keep improving",
    description:
      "Treat feedback as part of the process and look for ways to make the work better.",
  },
];

function BrandVisual() {
  return (
    <div
      className="relative isolate min-h-[360px] overflow-hidden rounded-3xl bg-[#242421] p-6 text-white sm:min-h-[470px] sm:p-10"
      aria-label="Abstract graphic representing strategy, design, and technology coming together"
      role="img"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 size-64 rounded-full border border-white/20 sm:size-80"
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 size-48 rounded-full border border-white/20 sm:size-64"
      />

      <div className="relative z-10 flex h-full min-h-[310px] flex-col justify-between sm:min-h-[390px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              The Ethixweb approach
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
              Different disciplines. One considered direction.
            </p>
          </div>

          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#c1272d]">
            <MoveUpRight size={23} aria-hidden="true" />
          </div>
        </div>

        <div className="relative my-10 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute size-48 rounded-full border border-white/15 sm:size-60"
          />

          <div
            aria-hidden="true"
            className="absolute size-36 rounded-full border border-white/20 sm:size-44"
          />

          <div className="relative flex size-28 items-center justify-center rounded-full bg-[#c1272d] shadow-2xl shadow-black/30 sm:size-36">
            <span className="text-2xl font-semibold tracking-[-0.08em] sm:text-3xl">
              EW<span className="text-white/55">.</span>
            </span>
          </div>

          <div className="absolute left-[8%] top-0 flex size-12 items-center justify-center rounded-xl border border-white/15 bg-[#32322f] sm:left-[18%] sm:size-14">
            <Compass size={23} className="text-[#ffb8ad]" />
          </div>

          <div className="absolute right-[8%] top-5 flex size-12 items-center justify-center rounded-xl border border-white/15 bg-[#32322f] sm:right-[18%] sm:size-14">
            <Lightbulb size={23} className="text-[#ffb8ad]" />
          </div>

          <div className="absolute bottom-0 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-xl border border-white/15 bg-[#32322f] sm:size-14">
            <Target size={23} className="text-[#ffb8ad]" />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-5">
          <p className="max-w-xs text-xs leading-6 text-white/60">
            Strategy <span className="mx-1 text-[#ffb8ad]">/</span> Design
            <span className="mx-1 text-[#ffb8ad]">/</span> Technology
          </p>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ffb8ad]">
            Built with intent
          </span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#20201e]">
      {/* HERO */}
      <section className="px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>A little about us</Eyebrow>

            <h1 className="mt-7 max-w-6xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[6.6rem]">
              Digital work
              <br />
              should mean
              <br />
              <span className="text-[#c1272d]">something.</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-8 border-t border-neutral-200 pt-8 md:grid-cols-[1fr_0.65fr] md:items-end lg:mt-14 lg:pt-10">
            <Reveal>
              <p className="max-w-3xl text-xl leading-8 text-neutral-700 sm:text-2xl sm:leading-10">
                Ethixweb brings business thinking, creative problem-solving,
                and technology together to make digital experiences more
                useful.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-md text-sm leading-7 text-neutral-500">
                We believe the strongest digital solutions begin with
                understanding people, asking better questions, and being
                deliberate about what we create.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <Reveal>
            <BrandVisual />
          </Reveal>

          <div className="lg:py-8">
            <Reveal>
              <Eyebrow>Our point of view</Eyebrow>

              <h2 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl">
                The best solution
                <br />
                is not always
                <br />
                <span className="text-[#c1272d]">the biggest one.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 text-base leading-8 text-neutral-600">
                <p>
                  In a world full of digital noise, it is easy to mistake more
                  features, more tools, or more content for progress. We take
                  a different view.
                </p>

                <p>
                  We want the work to have a reason to exist. That means
                  understanding the challenge, respecting the people using
                  the solution, and choosing a practical path from idea to
                  execution.
                </p>

                <p>
                  With India's diverse businesses, audiences, languages, and
                  digital needs in mind, we value experiences that are clear,
                  inclusive, mobile-friendly, and ready to grow with the
                  people they serve.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#c1272d] transition-colors hover:text-[#9e1d23]"
                >
                  Explore what we do
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#eeece5] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="What guides us"
                title="Principles behind"
                accent="the pixels."
                description="Good work is not only about how something looks. It is also about the choices, conversations, and care behind it."
              />

              <Reveal className="mt-8">
                <div className="flex items-start gap-4 border-l-2 border-[#c1272d] py-1 pl-5">
                  <Users
                    size={22}
                    className="mt-1 shrink-0 text-[#c1272d]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-7 text-neutral-600">
                    People are not an afterthought. They are the reason the
                    work matters.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="border-t border-neutral-300">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <Reveal key={principle.number} delay={index * 0.05}>
                    <article className="grid gap-4 border-b border-neutral-300 py-6 sm:grid-cols-[48px_1fr] sm:gap-5 sm:py-8">
                      <div className="flex size-11 items-center justify-center rounded-full border border-neutral-300 bg-white/60">
                        <Icon
                          size={20}
                          strokeWidth={1.7}
                          className="text-[#c1272d]"
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <h3 className="text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                            {principle.title}
                          </h3>
                          <span className="text-xs font-medium text-neutral-400">
                            {principle.number}
                          </span>
                        </div>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base">
                          {principle.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>What you can expect</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
              A thoughtful process.
              <br />
              <span className="text-[#c1272d]">Work with purpose.</span>
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {commitments.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c1272d]/40 hover:shadow-xl hover:shadow-neutral-900/[0.04] sm:p-8">
                  <span className="text-sm font-semibold tabular-nums text-[#c1272d]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.045em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-600">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="h-1 w-12 rounded-full bg-[#c1272d] transition-all duration-300 group-hover:w-20" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#252523] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <Eyebrow light>Good work starts with a conversation</Eyebrow>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Have a challenge
              <br />
              worth solving?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              Tell us what you are working towards. Let's explore what a
              thoughtful digital solution could look like.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#faf9f6] px-6 py-3 text-sm font-semibold text-[#20201e] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Start a conversation
              <ArrowDownRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Let's make it meaningful"
        title="Your next idea deserves a thoughtful start."
        description="Share your goals with us. We'll begin by understanding the problem you want to solve."
      />
    </main>
  );
}
