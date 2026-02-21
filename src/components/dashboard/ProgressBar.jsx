const sizeClasses = {
  sm: 'h-2',
  md: 'h-3'
};

const toneClasses = {
  brand: 'bg-brand-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500'
};

export default function ProgressBar({
  value = 0,
  label,
  size = 'sm',
  tone = 'brand',
  showValue = true,
  className = ''
}) {
  const percent = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{label}</span>
          {showValue && <span>{percent}%</span>}
        </div>
      )}
      <div className={`mt-2 w-full rounded-full bg-slate-100 ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} rounded-full ${toneClasses[tone]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
