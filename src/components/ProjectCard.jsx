import StatusBadge from './StatusBadge';
import ProgressBar from './dashboard/ProgressBar';

const statusProgress = {
  Submitted: 20,
  'In Progress': 62,
  Review: 78,
  Completed: 100,
  Pending: 35
};

export default function ProjectCard({ project }) {
  const progress =
    project.progress ?? statusProgress[project.status] ?? 45;

  return (
    <div className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {project.id}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {project.summary || project.client}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <div className="mt-6">
        <ProgressBar value={progress} label="Overall progress" />
      </div>
      <div className="mt-6 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
        <span>Updated {project.updatedAt}</span>
        {project.timeline && <span>Timeline {project.timeline}</span>}
        {project.budget && <span>Budget {project.budget}</span>}
        {project.assignedTo && (
          <span>Assigned to {project.assignedTo}</span>
        )}
      </div>
    </div>
  );
}
