import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/main-page/main-page';
import './Main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
