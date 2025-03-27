import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Test from './test'
import '../index.css';
import {AuthProvider} from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        < Test />
      </AuthProvider>
  </React.StrictMode>
);
