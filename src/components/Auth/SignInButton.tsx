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
    >
      Sign In
    </button>
  );
};