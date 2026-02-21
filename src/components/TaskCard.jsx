import StatusBadge from './StatusBadge';
import Button from './Button';

const getDueLabel = (dueDate) => {
  if (!dueDate) return 'No deadline';
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const due = new Date(dueDate);
  const diff = Math.ceil((due - start) / (1000 * 60 * 60 * 24));
  if (Number.isNaN(diff)) return 'Invalid date';
  if (diff === 0) return 'Due today';
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  return `${diff} days left`;
};

export default function TaskCard({ task, onAdvance }) {
  const dueLabel = getDueLabel(task.dueDate);

  return (
    <div className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {task.id}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {task.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {task.project}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={task.status} />
          {task.priority && <StatusBadge status={task.priority} />}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
          {task.dueDate && <span>Due {task.dueDate}</span>}
          <span>{dueLabel}</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAdvance(task.id)}
          disabled={task.status === 'Completed'}
        >
          {task.status === 'Completed' ? 'Completed' : 'Advance Status'}
        </Button>
      </div>
    </div>
  );
}
