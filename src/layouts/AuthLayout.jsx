import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-900 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="relative z-10 p-12">
          <Link to="/">
            <Logo tone="light" />
          </Link>
          <h1 className="mt-16 text-4xl font-semibold">
            Structured software delivery for modern teams.
          </h1>
          <p className="mt-6 max-w-lg text-base text-slate-200">
            MJLTechs connects clients, product leaders, and developers through
            clear workflows, transparent status, and measurable outcomes.
          </p>
        </div>
        <div className="relative z-10 p-12 text-sm text-slate-300">
          Trusted by product-driven organizations shipping critical systems.
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}