export default function Logo({ compact = false, className = '', tone = 'dark' }) {
  const headingClass = tone === 'light' ? 'text-white' : 'text-slate-900';
  const subClass = tone === 'light' ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-sm font-semibold text-white">
        MJ
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className={`text-sm font-semibold ${headingClass}`}>
            MJLTechs
          </p>
          <p className={`text-xs ${subClass}`}>
            Technology Platform
          </p>
        </div>
      )}
    </div>
  );
}