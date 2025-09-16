import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/main-page/main-page';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import './Main.css';

loader.config({ monaco });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
