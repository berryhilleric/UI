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
      className="w-20 bg-blue-600 text-white font-medium  border-blue-700 hover:bg-blue-700"
    >
      Sign In
    </button>
  );
};