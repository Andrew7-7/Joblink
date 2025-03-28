import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css';
import {AuthProvider} from './AuthContext';
import Feed from './feed';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        < Feed />
      </AuthProvider>
  </React.StrictMode>
);
