import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/authConfig';

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      // Changed from loginPopup to loginRedirect
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      Sign In
    </button>
  );
};