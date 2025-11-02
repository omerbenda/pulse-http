import React from 'react';
import ReactDOM from 'react-dom/client';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import App from './app';
import './Main.css';

loader.config({ monaco });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
