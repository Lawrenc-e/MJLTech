import { useMemo, useState } from 'react';
import {
  mockAdminStats,
  mockUsers,
  mockProducts,
  mockProjects
} from '../services/mockData';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import PageHeader from '../components/dashboard/PageHeader';
import Panel from '../components/dashboard/Panel';
import ProgressBar from '../components/dashboard/ProgressBar';

const metricIcons = {
  projects: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 14l4-4 4 4 6-6" />
      <path d="M4 20h16" />
    </svg>
  ),
  utilization: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19h16M6 16v-6M12 16V6M18 16v-3" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" />
    </svg>
  )
};

const activityFeed = [
  {
    id: 'ACT-01',
    title: 'Inventory Intelligence moved to Build',
    detail: 'Sprint 4 kickoff with Apex Manufacturing',
    time: '2 hours ago',
    status: 'In Progress'
  },
  {
    id: 'ACT-02',
    title: 'Statement of work approved',
    detail: 'Northwind Logistics signed phase two scope',
    time: '1 day ago',
    status: 'Submitted'
  },
  {
    id: 'ACT-03',
    title: 'Mobile Service Desk launched',
    detail: 'Helios Health release successfully delivered',
    time: '3 days ago',
    status: 'Completed'
  }
];

const stageConfig = [
  { label: 'Intake', statuses: ['Submitted'] },
  { label: 'Planning', statuses: ['Pending'] },
  { label: 'Build', statuses: ['In Progress'] },
  { label: 'Review', statuses: ['Review'] },
  { label: 'Launch', statuses: ['Completed'] }
];

const workloadLevels = [86, 72, 91, 64];

const parseBudget = (budget) => {
  if (!budget) return 0;
  const normalized = budget.toString().toLowerCase().replace(/[^0-9.k]/g, '');
  const value = Number.parseFloat(normalized);
  if (Number.isNaN(value)) return 0;
  return normalized.includes('k') ? value * 1000 : value;
};

const formatCurrency = (value) => {
  if (!value) return '$0';
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${Math.round(value)}`;
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState(
    mockProjects.map((project) => ({
      ...project,
      assignedTo: project.assignedTo || ''
    }))
  );
  const [assignments, setAssignments] = useState({});

  const developers = useMemo(
    () => mockUsers.filter((user) => user.role === 'developer'),
    []
  );

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status !== 'Completed').length,
    [projects]
  );

  const pipelineProjects = useMemo(
    () => projects.filter((project) => project.status !== 'Completed'),
    [projects]
  );

  const pipelineValue = useMemo(
    () => pipelineProjects.reduce((sum, project) => sum + parseBudget(project.budget), 0),
    [pipelineProjects]
  );

  const pipelineStages = useMemo(() => {
    const total = projects.length || 1;
    return stageConfig.map((stage) => {
      const count = projects.filter((project) => stage.statuses.includes(project.status)).length;
      return {
        label: stage.label,
        count,
        percent: Math.round((count / total) * 100)
      };
    });
  }, [projects]);

  const handleAssignChange = (projectId, value) => {
    setAssignments((prev) => ({ ...prev, [projectId]: value }));
  };

  const handleAssign = (projectId) => {
    const developerId = assignments[projectId];
    const developer = developers.find((dev) => dev.id === developerId);
    if (!developer) return;
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, assignedTo: developer.name }
          : project
      )
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin Control"
        title="Delivery command center"
        subtitle="Track pipeline health, revenue momentum, and team utilization in one place."
        actions={
          <>
            <Button variant="secondary" size="sm">Invite user</Button>
            <Button size="sm">Export report</Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active projects"
          value={activeProjects}
          description="In delivery right now"
          icon={metricIcons.projects}
          trend={{ value: '+12%', direction: 'up', label: '30d' }}
        />
        <StatCard
          label="Revenue pipeline"
          value={formatCurrency(pipelineValue)}
          description="Open statements of work"
          icon={metricIcons.revenue}
          trend={{ value: '+8%', direction: 'up', label: 'quarter' }}
        />
        <StatCard
          label="Team utilization"
          value="78%"
          description="Developer capacity in use"
          icon={metricIcons.utilization}
          trend={{ value: '-4%', direction: 'down', label: 'this week' }}
        />
        <StatCard
          label="Client satisfaction"
          value={mockAdminStats.satisfaction}
          description="Post-launch surveys"
          icon={metricIcons.quality}
          trend={{ value: '+0.3', direction: 'up', label: 'QoQ' }}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel
            title="Project pipeline status"
            subtitle="Visual stages across active delivery"
            className="transition duration-300 hover:shadow-soft"
          >
            <div className="grid gap-4 md:grid-cols-2" id="pipeline">
              {pipelineStages.map((stage) => (
                <div
                  key={stage.label}
                  className="rounded-2xl border border-slate-200/70 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {stage.label}
                      </p>
                      <p className="text-xs text-slate-500">
                        {stage.count} projects
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {stage.percent}%
                    </span>
                  </div>
                  <ProgressBar value={stage.percent} showValue={false} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Recent activity"
            subtitle="Latest movement across accounts and delivery"
          >
            <div className="space-y-4">
              {activityFeed.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{item.time}</span>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Revenue pipeline" subtitle="Active statements of work">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-3xl font-semibold text-slate-900">
                  {formatCurrency(pipelineValue)}
                </p>
                <p className="text-xs text-slate-500">
                  Estimated open revenue
                </p>
              </div>
              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                +8% QoQ
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {pipelineProjects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {project.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {project.client}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {project.budget || 'TBD'}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Developer workload" subtitle="Utilization by squad">
            <div className="space-y-4">
              {developers.map((dev, index) => (
                <div key={dev.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">
                      {dev.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {workloadLevels[index % workloadLevels.length]}%
                    </span>
                  </div>
                  <ProgressBar
                    value={workloadLevels[index % workloadLevels.length]}
                    showValue={false}
                    tone={workloadLevels[index % workloadLevels.length] > 85 ? 'warning' : 'brand'}
                  />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Team directory"
          subtitle="Active clients and internal stakeholders"
          action={<Button variant="secondary" size="sm">Add user</Button>}
          className="transition duration-300 hover:shadow-soft"
          id="users"
        >
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user.company}
                  </p>
                </div>
                <StatusBadge status={user.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Product portfolio"
          subtitle="Active internal platforms and initiatives"
          action={<Button variant="secondary" size="sm">Create product</Button>}
          className="transition duration-300 hover:shadow-soft"
          id="products"
        >
          <div className="space-y-3">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Owner: {product.owner}
                  </p>
                </div>
                <StatusBadge status={product.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <section id="assign">
        <Panel
          title="Assignments"
          subtitle="Match active projects with dedicated engineers"
        >
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {project.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {project.client} | {project.status}
                  </p>
                  {project.assignedTo && (
                    <p className="text-xs text-emerald-600">
                      Assigned to {project.assignedTo}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                    value={assignments[project.id] || ''}
                    onChange={(event) =>
                      handleAssignChange(project.id, event.target.value)
                    }
                  >
                    <option value="">Select developer</option>
                    {developers.map((dev) => (
                      <option key={dev.id} value={dev.id}>
                        {dev.name}
                      </option>
                    ))}
                  </select>
                  <Button size="sm" onClick={() => handleAssign(project.id)}>
                    Assign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
