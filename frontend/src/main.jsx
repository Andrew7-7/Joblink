import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css';
import ActorProvider from './ActorProvider';
import AuthProvider from './AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActorProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ActorProvider>
  </React.StrictMode>
);
