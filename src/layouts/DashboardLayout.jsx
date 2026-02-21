import { Link, NavLink, Outlet } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Button, { buttonClasses } from '../components/Button';

const roleLabels = {
  client: 'Client Workspace',
  developer: 'Developer Console',
  admin: 'Admin Control'
};

const icons = {
  projects: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  tasks: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h8M4 12h16M4 18h12" />
    </svg>
  ),
  overview: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 15a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-12 6a6 6 0 0 1 12 0M12 21a6 6 0 0 1 12 0" />
    </svg>
  ),
  product: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7l9-4 9 4-9 4-9-4Zm0 10l9 4 9-4M3 7v10m18-10v10" />
    </svg>
  ),
  assign: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16M4 12h10M4 18h6" />
      <path d="M16 14l4 4m0-4l-4 4" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  ),
  collapse: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = useMemo(() => {
    if (user?.role === 'developer') {
      return [
        { to: '/dashboard/developer', label: 'Assigned Tasks', icon: 'tasks' },
        { to: '/dashboard/developer#board', label: 'Status Board', icon: 'projects' }
      ];
    }
    if (user?.role === 'admin') {
      return [
        { to: '/dashboard/admin', label: 'Overview', icon: 'overview' },
        { to: '/dashboard/admin#users', label: 'Users', icon: 'users' },
        { to: '/dashboard/admin#products', label: 'Products', icon: 'product' },
        { to: '/dashboard/admin#assign', label: 'Assignments', icon: 'assign' }
      ];
    }
    return [
      { to: '/dashboard/client', label: 'Projects', icon: 'projects' },
      { to: '/dashboard/client#new', label: 'New Project', icon: 'plus' }
    ];
  }, [user?.role]);

  const roleAction = {
    client: { label: 'New Request', to: '/dashboard/client#new' },
    developer: { label: 'Log Update', to: '/dashboard/developer#board' },
    admin: { label: 'Create Project', to: '/dashboard/admin#pipeline' }
  }[user?.role];

  const initials =
    user?.name
      ?.split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'MJ';

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 transform border-r border-slate-200/70 bg-white py-8 transition md:static md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${sidebarCollapsed ? 'w-20 px-4' : 'w-72 px-6'}`}
        >
          <div className="flex items-center justify-between gap-2">
            <Logo compact={sidebarCollapsed} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="hidden rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 md:inline-flex"
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? icons.expand : icons.collapse}
              </button>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`
                }
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-brand-700">
                  {icons[item.icon]}
                </span>
                {!sidebarCollapsed && item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <div className="card-muted p-4 text-xs text-slate-600">
              {sidebarCollapsed ? (
                <span className="text-slate-500">Role</span>
              ) : (
                <>Role: {roleLabels[user?.role] || 'Workspace'}</>
              )}
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
            <div className="app-container flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-2 py-2 text-sm text-slate-600 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  Menu
                </button>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Dashboard
                  </p>
                  <h1 className="text-lg font-semibold text-slate-900">
                    {roleLabels[user?.role] || 'Workspace'}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {roleAction && (
                  <Link
                    to={roleAction.to}
                    className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                  >
                    {roleAction.label}
                  </Link>
                )}
                <button
                  type="button"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                  aria-label="Notifications"
                >
                  {icons.bell}
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
                </button>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {initials}
                  </span>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-slate-900">
                      {user?.name || 'MJLTechs User'}
                    </p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </header>
          <main className="app-container flex-1 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
