export default function Panel({
  title,
  subtitle,
  action,
  className = '',
  children,
  ...props
}) {
  return (
    <section className={`card p-6 ${className}`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-slate-900">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title || subtitle || action ? 'mt-6' : ''}>
        {children}
      </div>
    </section>
  );
}
