import React from 'react'
import ReactDOM from 'react-dom/client'
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './config/authConfig';
import App from './App.tsx'
import './index.css'


const msalInstance = new PublicClientApplication(msalConfig);

// Handle redirect promise
msalInstance.initialize().then(() => {
  // Account selection logic is app dependent
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

   msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
      if (event.payload && 'account' in event.payload && event.payload.account) {
        msalInstance.setActiveAccount(event.payload.account);
      }
    }
  });

  // Render app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
    </React.StrictMode>
  );
});