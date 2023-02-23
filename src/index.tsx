import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
    <div  id="header-menu-portal" ></div>
  </StrictMode >
);
