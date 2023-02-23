import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider';

interface Props {
  children: JSX.Element;
  to?: string;
}

export default function RequireAuth({ children, to = '/login' }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (!loading && !user)
    return <Navigate to={to} state={{ from: location }} replace />;

  return children;
}
