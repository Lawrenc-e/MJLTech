const styles = {
  Submitted: 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-sky-100 text-sky-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-slate-100 text-slate-700',
  Review: 'bg-cyan-100 text-cyan-700',
  Blocked: 'bg-rose-100 text-rose-700',
  Todo: 'bg-slate-100 text-slate-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Planned: 'bg-slate-100 text-slate-700',
  Upcoming: 'bg-slate-100 text-slate-700',
  'At Risk': 'bg-rose-100 text-rose-700',
  'On Track': 'bg-emerald-100 text-emerald-700',
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-700'
};

export default function StatusBadge({ status = 'Pending' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
}
