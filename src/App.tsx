import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import { AuthProvider } from './contexts/AuthContext';
import MarketingPage from './marketing-page/MarketingPage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

export default function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </AppTheme>
  );
}
