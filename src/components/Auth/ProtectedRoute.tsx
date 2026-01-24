import { useIsAuthenticated } from '@azure/msal-react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};