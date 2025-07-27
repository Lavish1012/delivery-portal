import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/enhanced-hover.css';
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
