import { Configuration, LogLevel, PopupRequest } from "@azure/msal-browser";

/**
 * Configuration object for MSAL authentication
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID, // Your SPA Client ID
    authority: import.meta.env.VITE_AZURE_AUTHORITY,
    knownAuthorities: [import.meta.env.VITE_AZURE_KNOWN_AUTHORITY],
    redirectUri: window.location.origin, // Dynamically uses current origin
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage" // For better performance across tabs
 // Set to true for IE11 support
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

/**
 * Scopes for authentication requests
 */
export const loginRequest: PopupRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    import.meta.env.VITE_API_SCOPE // Your API scope
  ],
};

/**
 * API configuration
 */
export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || "https://localhost:7001/api",
  scopes: [import.meta.env.VITE_API_SCOPE],
};