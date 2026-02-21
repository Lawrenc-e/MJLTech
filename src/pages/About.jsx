import SectionHeader from '../components/SectionHeader';

const values = [
  {
    title: 'Structured Delivery',
    description:
      'Every project is driven by repeatable workflows that keep teams aligned and decisions transparent.'
  },
  {
    title: 'Outcome Focused',
    description:
      'We prioritize business impact with measurable milestones and clear ownership.'
  },
  {
    title: 'Operational Clarity',
    description:
      'Admins and product leaders maintain visibility across clients, teams, and products.'
  }
];

export default function About() {
  return (
    <div className="app-container section-pad">
      <SectionHeader
        eyebrow="About MJLTechs"
        title="A platform built for complex software delivery"
        subtitle="MJLTechs combines product management rigor with execution speed, giving every stakeholder a shared source of truth."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="card p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {value.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              {value.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="card-muted p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Our mission
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Deliver technology services and products through structured,
            repeatable workflows that reduce risk and accelerate outcomes.
          </p>
        </div>
        <div className="card-muted p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Our teams
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Cross-functional squads pairing product strategy, engineering,
            and delivery leadership for consistent results.
          </p>
        </div>
      </div>
    </div>
  );
}