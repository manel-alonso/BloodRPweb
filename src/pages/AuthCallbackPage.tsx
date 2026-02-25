import { useEffect, useState } from 'react';
import { assetUrl } from '../utils/assetUrl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      setStatus('error');
      return;
    }

    if (code) {
      // Store the auth code - in production, send this to your backend
      // to exchange for tokens and create a session
      localStorage.setItem('discord_oauth_code', code);
      // Placeholder username until backend fetches real Discord user
      setUser({ username: 'Usuario' });
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [code, error, setUser]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, hsl(0, 0%, 5%) 0%, hsl(0, 50%, 8%) 100%)'
            : 'linear-gradient(180deg, hsl(0, 0%, 98%) 0%, hsl(0, 30%, 96%) 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderColor: 'divider',
          }}
        >
          <CardContent>
            <Box
              component="img"
              src={assetUrl('LOGO_png.png')}
              alt="Blood RP"
              sx={{
                height: 64,
                width: 'auto',
                maxWidth: 200,
                objectFit: 'contain',
                mb: 3,
              }}
            />

            {status === 'loading' && (
              <>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Completando inicio de sesión...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serás redirigido en un momento.
                </Typography>
              </>
            )}

            {status === 'success' && (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: 'success.main' }}>
                  ¡Bienvenido a Blood RP!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Has iniciado sesión correctamente con Discord. Únete a nuestro servidor
                  para completar la verificación.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 1 }}
                >
                  Unirse al Discord
                </Button>
                <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
                  Ir al inicio
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: 'error.main' }}>
                  Error al iniciar sesión
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {error === 'access_denied'
                    ? 'Has cancelado el inicio de sesión.'
                    : 'Algo salió mal. Por favor, inténtalo de nuevo.'}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                  Volver a intentar
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
