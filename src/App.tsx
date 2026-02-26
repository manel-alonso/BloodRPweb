import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import { AuthProvider } from './contexts/AuthContext';
import { WhitelistStatusProvider } from './contexts/WhitelistStatusContext';
import MarketingPage from './marketing-page/MarketingPage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import WhitelistPage from './pages/WhitelistPage';
import JobsPage from './pages/JobsPage';
import ShopPage from './pages/ShopPage';

export default function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AuthProvider>
      <WhitelistStatusProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/whitelist" element={<WhitelistPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
      </WhitelistStatusProvider>
      </AuthProvider>
    </AppTheme>
  );
}
