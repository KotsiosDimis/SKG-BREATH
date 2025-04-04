// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use 'react-dom/client' in React 18
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
