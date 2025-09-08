// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { AuthProvider } from './contexts/AuthContext'; // ✅ Correct path
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  
      <AuthProvider>
        <App />
      </AuthProvider>
  
  
);