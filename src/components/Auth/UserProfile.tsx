import { useMsal } from '@azure/msal-react';

export const UserProfile = () => {
  const { accounts } = useMsal();
  const account = accounts[0];

  if (!account) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{account.name}</p>
        <p className="text-xs text-gray-500">{account.username}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
        {account.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};