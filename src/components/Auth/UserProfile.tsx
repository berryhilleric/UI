import { useMsal } from '@azure/msal-react';

export const UserProfile = () => {
  const { accounts } = useMsal();
  const account = accounts[0];

  if (!account) return null;

  return (
    <div>
      <p>{account.name}</p>
      <p>{account.username}</p>
      <span>{account.name?.charAt(0).toUpperCase()}</span>
    </div>
  );
};