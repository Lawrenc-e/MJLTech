import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { buttonClasses } from '../components/Button';

const services = [
  {
    title: 'Web Applications',
    description:
      'Modern web platforms that streamline operations, connect customers, and scale with your business.',
    bullets: ['Customer portals', 'B2B platforms', 'Analytics dashboards'],
    badge: 'Web'
  },
  {
    title: 'Mobile Applications',
    description:
      "iOS and Android experiences that keep your product in your customers' hands.",
    bullets: ['Native & cross-platform', 'App store delivery', 'Offline-first UX'],
    badge: 'Mobile'
  },
  {
    title: 'Systems & Automation',
    description:
      'Internal systems that eliminate busywork, integrate tools, and unlock visibility.',
    bullets: ['Operational tooling', 'API integrations', 'Workflow automation'],
    badge: 'Systems'
  },
  {
    title: 'Custom Software',
    description:
      'Tailored solutions built around your unique processes with long-term scalability.',
    bullets: ['Product strategy', 'Architecture & DevOps', 'Ongoing optimization'],
    badge: 'Custom'
  }
];

const workflowSnapshot = [
  {
    step: '01',
    title: 'Discover & Align',
    detail:
      'We clarify goals, users, and success metrics before lines of code are written.'
  },
  {
    step: '02',
    title: 'Design & Build',
    detail:
      'Cross-functional squads ship secure, maintainable software in focused sprints.'
  },
  {
    step: '03',
    title: 'Launch & Scale',
    detail:
      'We harden, deploy, and optimize with analytics and performance tuning.'
  }
];

const engagementSteps = [
  {
    step: '01',
    title: 'Strategy Sprint',
    detail:
      'Workshops define scope, technical direction, and the right MVP surface area.'
  },
  {
    step: '02',
    title: 'Design + Architecture',
    detail:
      'UX flows, system diagrams, and technical plans turn ideas into build-ready blueprints.'
  },
  {
    step: '03',
    title: 'Build + QA',
    detail:
      'Engineering, testing, and iteration delivered by dedicated product squads.'
  },
  {
    step: '04',
    title: 'Launch + Optimize',
    detail:
      'Release, monitor, and iterate with performance, security, and growth in mind.'
  }
];

const metrics = [
  {
    value: '120+',
    label: 'Active workflows',
    detail: 'Client builds in flight'
  },
  {
    value: '18',
    label: 'Delivery squads',
    detail: 'Cross-functional teams ready'
  },
  {
    value: '4.6 wks',
    label: 'Avg. lead time',
    detail: 'From kickoff to first release'
  }
];

const focusAreas = [
  'Product strategy',
  'UX/UI design',
  'Full-stack engineering',
  'Cloud + DevOps'
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="app-container section-pad">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip border-brand-200/80 bg-white/80 text-brand-700">
                  Startup tech agency
                </span>
                <span className="chip border-slate-200/70 bg-slate-900 text-white">
                  Custom digital solutions
                </span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                MJLTechs builds custom digital solutions for growing businesses.
              </h1>
              <p className="text-lg text-slate-600 md:text-xl">
                We design and engineer web apps, mobile apps, and internal systems that modernize
                operations and unlock new revenue.
              </p>
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex w-full flex-col gap-2 sm:w-auto">
                  <Link
                    to="/register"
                    className={buttonClasses({ variant: 'primary', size: 'lg' })}
                  >
                    Start a Project
                  </Link>
                  <p className="text-xs text-slate-500">
                    Best for new builds, modernization, and launch-ready teams.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto">
                  <Link
                    to="/contact"
                    className={buttonClasses({ variant: 'secondary', size: 'lg' })}
                  >
                    Talk to an Expert
                  </Link>
                  <p className="text-xs text-slate-500">
                    Get strategy, scoping, and technical guidance.
                  </p>
                </div>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-500 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200/80 hover:shadow-glow"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-8 -top-8 h-28 w-28 rounded-3xl bg-brand-100/70 blur-2xl" aria-hidden="true" />
              <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-brand-200/60 blur-3xl" aria-hidden="true" />
              <div className="card p-8 shadow-glow transition duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Engagement snapshot
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      Product Delivery
                    </h3>
                  </div>
                  <span className="chip border-brand-200/80 bg-brand-100/60 text-brand-700">
                    Active
                  </span>
                </div>
                <div className="mt-8 space-y-5">
                  {workflowSnapshot.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-sm font-semibold text-brand-700">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-xl border border-slate-200/60 bg-slate-50 p-4 text-sm text-slate-600">
                  Dedicated squads with product strategy, UX/UI, and engineering in one place.
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="chip border-slate-200/60 bg-white/80 text-slate-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-200/60 bg-white/70">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
          aria-hidden="true"
        />
        <div className="app-container section-pad">
          <SectionHeader
            eyebrow="Services"
            title="Custom software delivery with full-stack depth"
            subtitle="From MVPs to modernization, MJLTechs provides product strategy, design, and engineering for ambitious teams."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200/80 hover:shadow-glow"
              >
                <span className="chip border-brand-200/70 bg-brand-100/60 text-brand-700">
                  {service.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-500">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-slate-50/70">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
          aria-hidden="true"
        />
        <div className="app-container section-pad">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeader
              eyebrow="Workflow"
              title="A delivery rhythm built for modern product teams"
              subtitle="Clear phases, weekly demos, and transparent reporting keep everyone aligned from kickoff to launch."
            />
            <div className="card-muted p-6">
              <div className="space-y-4">
                {engagementSteps.map((step) => (
                  <div
                    key={step.title}
                    className="group card p-4 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-xs font-semibold text-brand-700">
                        {step.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-brand-200/60 bg-white/80 p-4 text-sm text-slate-600">
                A dedicated lead and shared roadmap keep scope, velocity, and outcomes on track.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
          aria-hidden="true"
        />
        <div className="app-container section-pad">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-12 text-white shadow-soft md:px-12 md:py-14">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-500/40 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-brand-300/30 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="chip border-white/30 bg-white/10 text-white">
                  Ready to launch
                </span>
                <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                  Build with a senior product team at MJLTechs.
                </h2>
                <p className="mt-3 text-sm text-slate-200 md:text-base">
                  Kick off a new product, modernize legacy systems, or scale an existing platform.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex w-full flex-col gap-2 sm:w-auto">
                  <Link
                    to="/register"
                    className={buttonClasses({
                      variant: 'primary',
                      size: 'lg',
                      className: 'bg-white text-brand-900 hover:bg-slate-100'
                    })}
                  >
                    Start a Project
                  </Link>
                  <p className="text-xs text-slate-200">
                    Submit your project for a tailored plan.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto">
                  <Link
                    to="/contact"
                    className={buttonClasses({
                      variant: 'secondary',
                      size: 'lg',
                      className: 'border-white/40 text-white hover:border-white hover:text-white'
                    })}
                  >
                    Talk to an Expert
                  </Link>
                  <p className="text-xs text-slate-200">
                    Get guidance before you commit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
