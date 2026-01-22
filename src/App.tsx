import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/Auth/SignInButton';
import { SignOutButton } from './components/Auth/SignOutButton'
import { UserProfile } from './components/Auth/UserProfile';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { ApiService } from './services/apiService';
import { useEffect, useState } from 'react';

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [apiData, setApiData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Test API call
      const api = new ApiService(instance);
      api.get('/tasks/me')
        .then(data => setApiData(data as Record<string, unknown>))
        .catch(error => console.error('API call failed:', error));
    }
  }, [isAuthenticated, instance]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Task Management
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <UserProfile />
                  <SignOutButton />
                </>
              ) : (
                <SignInButton />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <ProtectedRoute>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 mb-4">You are successfully authenticated!</p>
              
              {apiData && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                  <h3 className="font-semibold text-green-900 mb-2">API Response:</h3>
                  <pre className="text-sm text-green-800 overflow-auto">
                    {JSON.stringify(apiData, null, 2)}
                  </pre>
                </div>
              )}
              
              {/* Your task management components will go here */}
            </div>
          </ProtectedRoute>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Task Management
              </h2>
              <p className="text-gray-600 mb-8">
                Collaborate with your team and manage tasks efficiently
              </p>
              <SignInButton />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;