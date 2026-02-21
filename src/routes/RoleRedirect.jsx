import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleToPath = {
  client: '/dashboard/client',
  developer: '/dashboard/developer',
  admin: '/dashboard/admin'
};

export default function RoleRedirect() {
  const { user } = useAuth();
  const destination = roleToPath[user?.role] ?? roleToPath.client;
  return <Navigate to={destination} replace />;
}