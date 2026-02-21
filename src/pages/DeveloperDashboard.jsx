import { useEffect, useMemo, useState } from 'react';
import { fetchTasks } from '../services/tasks';
import { mockTasks } from '../services/mockData';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import PageHeader from '../components/dashboard/PageHeader';
import Panel from '../components/dashboard/Panel';
import ProgressBar from '../components/dashboard/ProgressBar';

const statusFlow = ['Todo', 'In Progress', 'Review', 'Completed'];
const statusFilters = ['All', ...statusFlow];

const metricIcons = {
  tasks: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 6h14M5 12h14M5 18h10" />
    </svg>
  ),
  focus: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6v6l4 2" />
      <path d="M4 4h4M16 4h4M4 20h4M16 20h4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7h10M4 12h16M4 17h8" />
      <path d="M18 7l2 2-2 2" />
    </svg>
  ),
  velocity: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 9l3 3" />
      <path d="M12 15h0" />
    </svg>
  )
};

const getCountdown = (dueDate) => {
  if (!dueDate) return { label: 'No deadline', tone: 'neutral' };
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const due = new Date(dueDate);
  const diff = Math.ceil((due - start) / (1000 * 60 * 60 * 24));
  if (Number.isNaN(diff)) return { label: 'Invalid date', tone: 'neutral' };
  if (diff === 0) return { label: 'Due today', tone: 'warning' };
  if (diff < 0) return { label: `${Math.abs(diff)} days overdue`, tone: 'danger' };
  return { label: `${diff} days left`, tone: diff <= 3 ? 'warning' : 'brand' };
};

export default function DeveloperDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    let active = true;
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await fetchTasks();
        const data = response?.data?.tasks ?? response?.data ?? [];
        if (active && Array.isArray(data) && data.length) {
          setTasks(data);
        } else if (active) {
          setTasks(mockTasks);
        }
      } catch {
        if (active) setTasks(mockTasks);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadTasks();
    return () => {
      active = false;
    };
  }, []);

  const tasksWithSprint = useMemo(
    () =>
      tasks.map((task, index) => ({
        ...task,
        sprint: task.sprint || (index < 2 ? 'Sprint 24' : 'Sprint 25')
      })),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'All') return tasksWithSprint;
    return tasksWithSprint.filter((task) => task.status === activeFilter);
  }, [activeFilter, tasksWithSprint]);

  const sprintGroups = useMemo(() => {
    const grouped = filteredTasks.reduce((acc, task) => {
      const key = task.sprint || 'Backlog';
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
    const order = ['Sprint 24', 'Sprint 25', 'Backlog'];
    return order
      .map((sprint) => ({ sprint, tasks: grouped[sprint] || [] }))
      .filter((group) => group.tasks.length);
  }, [filteredTasks]);

  const deadlineTasks = useMemo(() => {
    return [...tasksWithSprint]
      .filter((task) => task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4);
  }, [tasksWithSprint]);

  const productivityStats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const review = tasks.filter((task) => task.status === 'Review').length;
    return [
      { label: 'Completed', value: completed || 0, helper: 'This week' },
      { label: 'In progress', value: inProgress || 0, helper: 'Active now' },
      { label: 'In review', value: review || 0, helper: 'Awaiting QA' }
    ];
  }, [tasks]);

  const advanceStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = statusFlow.indexOf(task.status);
        const nextStatus =
          currentIndex === -1 || currentIndex === statusFlow.length - 1
            ? task.status
            : statusFlow[currentIndex + 1];
        return { ...task, status: nextStatus };
      })
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Developer Console"
        title="Sprint focus"
        subtitle="Track priorities, deadlines, and personal delivery momentum."
        actions={
          <>
            <Button variant="secondary" size="sm">Open sprint board</Button>
            <Button size="sm">Log update</Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Assigned tasks"
          value={tasks.length}
          description="Active this sprint"
          icon={metricIcons.tasks}
          trend={{ value: '+3', direction: 'up', label: 'this week' }}
        />
        <StatCard
          label="Focus score"
          value="84%"
          description="Based on cycle time"
          icon={metricIcons.focus}
          trend={{ value: '+2%', direction: 'up', label: 'last sprint' }}
        />
        <StatCard
          label="Review load"
          value={`${tasks.filter((task) => task.status === 'Review').length}`}
          description="Awaiting feedback"
          icon={metricIcons.review}
          trend={{ value: '-1', direction: 'down', label: 'today' }}
        />
        <StatCard
          label="Velocity"
          value="21 pts"
          description="Avg per sprint"
          icon={metricIcons.velocity}
          trend={{ value: '+4%', direction: 'up', label: 'trend' }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeFilter === status
                ? 'border-brand-200 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-700'
            }`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2" id="board">
          {loading ? (
            <div className="card p-6 text-sm text-slate-500">
              Loading tasks...
            </div>
          ) : sprintGroups.length ? (
            sprintGroups.map((group) => (
              <Panel
                key={group.sprint}
                title={group.sprint}
                subtitle={`${group.tasks.length} tasks assigned`}
              >
                <div className="space-y-4">
                  {group.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onAdvance={advanceStatus}
                    />
                  ))}
                </div>
              </Panel>
            ))
          ) : (
            <EmptyState
              title="No tasks assigned"
              description="You are all caught up for now."
            />
          )}
        </div>

        <div className="space-y-6">
          <Panel title="Deadline countdown" subtitle="Closest delivery dates">
            <div className="space-y-3">
              {deadlineTasks.map((task) => {
                const countdown = getCountdown(task.dueDate);
                return (
                  <div
                    key={task.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Due {task.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.priority && <StatusBadge status={task.priority} />}
                      <span
                        className={`text-xs font-semibold ${
                          countdown.tone === 'danger'
                            ? 'text-rose-600'
                            : countdown.tone === 'warning'
                              ? 'text-amber-600'
                              : 'text-slate-600'
                        }`}
                      >
                        {countdown.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Productivity summary" subtitle="Personal delivery stats">
            <div className="grid gap-3">
              {productivityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-500">{stat.helper}</p>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {stat.value}
                  </span>
                </div>
              ))}
              <div className="rounded-2xl border border-slate-200/60 bg-white px-4 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Focus time</span>
                  <span className="font-semibold text-slate-900">6.4 hrs</span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={76} label="Productivity target" />
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
