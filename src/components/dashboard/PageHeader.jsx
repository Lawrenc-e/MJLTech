export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-600 md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
