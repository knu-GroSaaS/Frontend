import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { useAuthStore } from "./store";
import { logOut } from './apis/login/loginapi.js';
import Cookies from 'js-cookie';

function Root() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const refreshToken = Cookies.get("refreshToken");
      clearAuth();
      logOut(refreshToken);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearAuth]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
