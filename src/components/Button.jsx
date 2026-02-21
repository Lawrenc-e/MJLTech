const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-600',
  secondary:
    'bg-white text-brand-700 border border-brand-200 hover:border-brand-300 hover:text-brand-800',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  dark: 'bg-slate-900 text-white hover:bg-slate-800'
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
};

export const buttonClasses = ({
  variant = 'primary',
  size = 'md',
  className = ''
} = {}) =>
  `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}