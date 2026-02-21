const trendStyles = {
  up: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  down: 'border-rose-100 bg-rose-50 text-rose-700',
  neutral: 'border-slate-200 bg-slate-100 text-slate-600'
};

export default function StatCard({
  label,
  value,
  helper,
  description,
  icon,
  trend,
  className = ''
}) {
  const detail = description || helper;
  const trendDirection = trend?.direction || 'neutral';
  const trendArrow =
    trendDirection === 'down'
      ? '\u2193'
      : trendDirection === 'up'
        ? '\u2191'
        : '\u2192';

  return (
    <div
      className={`group card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {value}
          </p>
          {detail && (
            <p className="mt-2 text-xs text-slate-500">{detail}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            {icon}
          </div>
        )}
      </div>
      {trend?.value && (
        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${trendStyles[trendDirection]}`}
        >
          <span aria-hidden="true">{trendArrow}</span>
          <span>{trend.value}</span>
          {trend.label && (
            <span className="font-normal text-slate-500">
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
