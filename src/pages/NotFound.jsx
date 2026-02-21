import { Link } from 'react-router-dom';
import { buttonClasses } from '../components/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="card p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className={buttonClasses({ variant: 'primary', size: 'lg', className: 'mt-6' })}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}