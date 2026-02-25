import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InitColorSchemeScript defaultMode="dark" />
    <App />
  </React.StrictMode>,
);
