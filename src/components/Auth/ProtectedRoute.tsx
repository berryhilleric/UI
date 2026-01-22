import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { loginRequest } from '../../config/authConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  useEffect(() => {
    if (!isAuthenticated) {
      // Changed from loginPopup to loginRedirect
      instance.loginRedirect(loginRequest).catch((error) => {
        console.error('Auto-login failed:', error);
      });
    }
  }, [isAuthenticated, instance]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};