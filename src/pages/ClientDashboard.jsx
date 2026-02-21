import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProjects } from '../services/projects';
import { mockProjects } from '../services/mockData';
import Button from '../components/Button';
import Input from '../components/Input';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import PageHeader from '../components/dashboard/PageHeader';
import Panel from '../components/dashboard/Panel';
import ProgressBar from '../components/dashboard/ProgressBar';

const initialForm = {
  name: '',
  summary: '',
  timeline: '',
  budget: ''
};

const metricIcons = {
  projects: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19h16M4 15l4-4 4 4 6-6" />
    </svg>
  ),
  budget: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v18M6 7h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" />
    </svg>
  ),
  deliverable: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h6" />
    </svg>
  )
};

const milestones = [
  { title: 'Discovery complete', date: 'Feb 05, 2026', status: 'Completed' },
  { title: 'Design system sign-off', date: 'Feb 12, 2026', status: 'In Progress' },
  { title: 'MVP build ready', date: 'Feb 26, 2026', status: 'Upcoming' },
  { title: 'Launch preparation', date: 'Mar 05, 2026', status: 'Upcoming' }
];

const nextDeliverable = {
  title: 'Sprint demo and release candidate',
  date: 'Feb 18, 2026',
  owner: 'MJLTechs delivery team'
};

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

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;
    const loadProjects = async () => {
      setLoading(true);
      try {
        const response = await fetchProjects();
        const data = response?.data?.projects ?? response?.data ?? [];
        if (active && Array.isArray(data) && data.length) {
          setProjects(data);
        } else if (active) {
          setProjects(mockProjects);
        }
      } catch {
        if (active) setProjects(mockProjects);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Project name is required.';
    if (!form.summary.trim()) nextErrors.summary = 'Add a short summary.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const newProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      name: form.name,
      summary: form.summary,
      client: user?.company || 'MJLTechs Client',
      status: 'Submitted',
      updatedAt: new Date().toISOString().split('T')[0],
      budget: form.budget || 'TBD',
      timeline: form.timeline || 'TBD'
    };
    setProjects((prev) => [newProject, ...prev]);
    setForm(initialForm);
    setErrors({});
    setFormOpen(false);
  };

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status !== 'Completed').length,
    [projects]
  );

  const overallProgress = useMemo(() => {
    if (!projects.length) return 0;
    const progressValues = {
      Submitted: 20,
      'In Progress': 65,
      Review: 85,
      Completed: 100
    };
    const total = projects.reduce(
      (sum, project) => sum + (progressValues[project.status] || 45),
      0
    );
    return Math.round(total / projects.length);
  }, [projects]);

  const totalBudget = useMemo(
    () => projects.reduce((sum, project) => sum + parseBudget(project.budget), 0),
    [projects]
  );
  const spentBudget = Math.round(totalBudget * 0.58);
  const remainingBudget = Math.max(totalBudget - spentBudget, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Client Workspace"
        title="Delivery overview"
        subtitle="Stay ahead of milestones, budget, and upcoming releases."
        actions={
          <Button onClick={() => setFormOpen((prev) => !prev)}>
            {formOpen ? 'Close form' : 'Submit new project'}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active projects"
          value={activeProjects}
          description="In delivery"
          icon={metricIcons.projects}
          trend={{ value: '+2', direction: 'up', label: 'this month' }}
        />
        <StatCard
          label="Overall progress"
          value={`${overallProgress}%`}
          description="Average across projects"
          icon={metricIcons.progress}
          trend={{ value: '+6%', direction: 'up', label: 'last 30d' }}
        />
        <StatCard
          label="Budget remaining"
          value={formatCurrency(remainingBudget)}
          description="Across active work"
          icon={metricIcons.budget}
          trend={{ value: '-8%', direction: 'down', label: 'this quarter' }}
        />
        <StatCard
          label="Next deliverable"
          value="6 days"
          description="Until next handoff"
          icon={metricIcons.deliverable}
          trend={{ value: '+1 day', direction: 'neutral', label: 'window' }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          title="Project progress"
          subtitle="Overall delivery health and milestone readiness"
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Overall progress
                  </p>
                  <p className="text-xs text-slate-500">
                    Updated weekly by your delivery lead
                  </p>
                </div>
                <StatusBadge status="On Track" />
              </div>
              <div className="mt-4">
                <ProgressBar value={overallProgress} size="md" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Next deliverable
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {nextDeliverable.title}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Due {nextDeliverable.date}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Owner: {nextDeliverable.owner}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Milestone tracker
                </p>
                <div className="mt-4 space-y-3">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.title}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {milestone.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {milestone.date}
                        </p>
                      </div>
                      <StatusBadge status={milestone.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Budget summary" subtitle="Allocated vs remaining spend">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Total budget</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(totalBudget)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Spent to date</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(spentBudget)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Remaining</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(remainingBudget)}
                </span>
              </div>
              <ProgressBar value={totalBudget ? Math.round((spentBudget / totalBudget) * 100) : 0} label="Budget used" />
            </div>
          </Panel>

          <Panel title="Communication" subtitle="Client success touchpoints">
            <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white p-5 text-sm text-slate-500">
              Dedicated updates, weekly summaries, and stakeholder syncs will appear here once messaging
              is connected.
            </div>
            <Button variant="secondary" size="sm" className="mt-4">
              Open message center
            </Button>
          </Panel>
        </div>
      </div>

      <section id="new">
        <Panel
          title="New project request"
          subtitle="Submit a scoped request for your next initiative"
        >
          {formOpen ? (
            <form onSubmit={handleCreate} className="space-y-5">
              <Input
                label="Project name"
                value={form.name}
                onChange={handleChange('name')}
                error={errors.name}
                placeholder="Client experience redesign"
              />
              <Input
                label="Summary"
                value={form.summary}
                onChange={handleChange('summary')}
                error={errors.summary}
                placeholder="Briefly describe the outcome you need."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Timeline"
                  value={form.timeline}
                  onChange={handleChange('timeline')}
                  placeholder="6-8 weeks"
                />
                <Input
                  label="Estimated budget"
                  value={form.budget}
                  onChange={handleChange('budget')}
                  placeholder="$35k"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">Submit request</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Launch a new engagement, upgrade your platform, or extend an existing build.
              </p>
              <Button onClick={() => setFormOpen(true)}>Start request</Button>
            </div>
          )}
        </Panel>
      </section>

      <Panel title="Active projects" subtitle="Latest updates across engagements">
        {loading ? (
          <div className="card p-6 text-sm text-slate-500">
            Loading projects...
          </div>
        ) : projects.length ? (
          <div className="grid gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Submit a new project to start delivery planning."
            action={<Button onClick={() => setFormOpen(true)}>Create Project</Button>}
          />
        )}
      </Panel>
    </div>
  );
}
