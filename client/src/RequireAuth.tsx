import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider';

interface Props {
  children: JSX.Element;
  loggedIn?: boolean;
  to?: string;
}

export default function RequireAuth({
  children,
  loggedIn = true,
  to = '/login',
}: Props) {
  const auth = useAuth();
  const location = useLocation();

  if (loggedIn && !auth.user) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }
  if (!loggedIn && auth.user) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  return children;
}
