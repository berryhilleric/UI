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
      className="w-20 bg-red-600 text-white font-medium  border-red-700 hover:bg-red-700"
    >
      Sign Out
    </button>
  );
};