import { useEffect, useState } from 'react';
import { assetUrl } from '../utils/assetUrl';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

const REDIRECT_DELAY_SEC = 5;

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SEC);
  const error = searchParams.get('error');
  const code = searchParams.get('code');

  useEffect(() => {
    if (error) {
      setStatus('error');
      return;
    }

    if (!code) {
      setStatus('error');
      return;
    }

    const authCode = code;
    const base = import.meta.env.BASE_URL || '/';
    const redirectUri =
      (import.meta.env.VITE_DISCORD_REDIRECT_URI as string | undefined) ||
      new URL('auth/callback', window.location.origin + base).href;
    const apiUrl =
      (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
      window.location.origin + (base === '/' ? '' : base.replace(/\/$/, ''));

    let cancelled = false;

    async function fetchUser() {
      try {
        const res = await fetch(
          `${apiUrl}/api/auth/discord?code=${encodeURIComponent(authCode)}&redirect_uri=${encodeURIComponent(redirectUri)}`
        );
        if (cancelled) return;
        if (res.ok) {
          const data = (await res.json()) as { username: string; avatar?: string };
          setUser({ username: data.username, avatar: data.avatar });
        } else {
          setUser({ username: 'Usuario' });
        }
      } catch {
        if (!cancelled) setUser({ username: 'Usuario' });
      } finally {
        if (!cancelled) setStatus('success');
      }
    }

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [code, error, setUser]);

  useEffect(() => {
    if (status === 'loading') return;

    const targetPath = status === 'success' ? '/' : '/login';
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(targetPath);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, navigate]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        overflow: 'hidden',
      }}
    >
      {/* Video background - same as Login */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="iframe"
          src={YOUTUBE_EMBED_URL}
          title="Blood RP background"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%) scale(1.15)',
            filter: 'blur(6px)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            borderColor: 'rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(18,18,18,0.85)',
            backdropFilter: 'blur(12px)',
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
                <CircularProgress sx={{ mb: 2, color: '#fff' }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#fff' }}>
                  Completando inicio de sesión...
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Serás redirigido en un momento.
                </Typography>
              </>
            )}

            {status === 'success' && (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#4caf50', fontWeight: 600 }}>
                  ¡Bienvenido a Blood RP!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}
                >
                  Has iniciado sesión correctamente con Discord.
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Redirigiendo en {countdown} segundos...
                </Typography>
              </>
            )}

            {status === 'error' && (
              <>
                <Typography variant="h5" gutterBottom sx={{ color: '#f44336', fontWeight: 600 }}>
                  Error al iniciar sesión
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
                  {error === 'access_denied'
                    ? 'Has cancelado el inicio de sesión.'
                    : 'Algo salió mal. Por favor, inténtalo de nuevo.'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Redirigiendo en {countdown} segundos...
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
