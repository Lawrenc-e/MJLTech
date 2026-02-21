export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left'
}) {
  const alignment =
    align === 'center'
      ? 'items-center text-center'
      : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-slate-600 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}