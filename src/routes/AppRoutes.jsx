import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRedirect from './RoleRedirect';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ClientDashboard from '../pages/ClientDashboard';
import DeveloperDashboard from '../pages/DeveloperDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="dashboard" element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<RoleRedirect />} />
          <Route
            path="client"
            element={<ProtectedRoute roles={['client']} />}
          >
            <Route index element={<ClientDashboard />} />
          </Route>
          <Route
            path="developer"
            element={<ProtectedRoute roles={['developer']} />}
          >
            <Route index element={<DeveloperDashboard />} />
          </Route>
          <Route
            path="admin"
            element={<ProtectedRoute roles={['admin']} />}
          >
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}