import { useMsal } from '@azure/msal-react';

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = async () => {
    try {
      // Changed from logoutPopup to logoutRedirect
      await instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
    >
      Sign Out
    </button>
  );
};