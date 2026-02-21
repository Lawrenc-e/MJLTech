export default function FullScreenLoader({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
        <span className="text-sm text-slate-600">{label}</span>
      </div>
    </div>
  );
}