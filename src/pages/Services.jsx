import SectionHeader from '../components/SectionHeader';

const offerings = [
  {
    title: 'Custom Software Delivery',
    detail:
      'Full-stack application builds with clean architecture, QA, and deployment support.'
  },
  {
    title: 'Product Management',
    detail:
      'Roadmapping, backlog refinement, and release planning tied to measurable outcomes.'
  },
  {
    title: 'Workflow Automation',
    detail:
      'Operational workflows that connect stakeholders, approvals, and task execution.'
  },
  {
    title: 'Platform Enablement',
    detail:
      'Internal product modernization and integration services across systems.'
  }
];

export default function Services() {
  return (
    <div className="app-container section-pad">
      <SectionHeader
        eyebrow="Services"
        title="Everything you need to launch and scale"
        subtitle="MJLTechs supports the full product lifecycle with services designed for high-impact delivery."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {offerings.map((offer) => (
          <div key={offer.title} className="card p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {offer.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              {offer.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}