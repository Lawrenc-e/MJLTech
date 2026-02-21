import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Button, { buttonClasses } from '../components/Button';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' }
];

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900'
  }`;

export default function PublicLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="app-container flex items-center justify-between py-4">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              Menu
            </button>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={buttonClasses({ variant: 'ghost', size: 'sm' })}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={buttonClasses({ variant: 'primary', size: 'sm' })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="app-container flex flex-col gap-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              {isAuthenticated && (
                <div className="text-xs text-slate-500">
                  Signed in as {user?.email}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative border-t border-slate-200/70 bg-slate-50/80">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
          aria-hidden="true"
        />
        <div className="app-container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-slate-600">
                MJLTechs is a modern technology agency building custom web apps,
                mobile products, and internal systems for growth-focused teams.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
                Trusted delivery partners
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Company
              </p>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <Link to="/about" className="transition hover:text-slate-900">
                  About MJLTechs
                </Link>
                <Link to="/services" className="transition hover:text-slate-900">
                  Services
                </Link>
                <Link to="/contact" className="transition hover:text-slate-900">
                  Contact
                </Link>
                <Link to="/register" className="transition hover:text-slate-900">
                  Start a Project
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Services
              </p>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <span>Web Application Development</span>
                <span>Mobile Product Engineering</span>
                <span>Systems Integration</span>
                <span>Custom Software Strategy</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quick Access
              </p>
              <div className="flex flex-col gap-2 text-sm text-slate-600">
                <Link to="/contact" className="transition hover:text-slate-900">
                  Talk to an Expert
                </Link>
                <Link to="/register" className="transition hover:text-slate-900">
                  Project Intake
                </Link>
                <Link to="/login" className="transition hover:text-slate-900">
                  Client Login
                </Link>
                <Link to="/dashboard" className="transition hover:text-slate-900">
                  Dashboard Access
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <span>(c) 2026 MJLTechs. All rights reserved.</span>
            <span>Built for secure, scalable product delivery.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
