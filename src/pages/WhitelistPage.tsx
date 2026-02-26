import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppAppBar from '../marketing-page/components/AppAppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useAuth } from '../contexts/AuthContext';
import { assetUrl } from '../utils/assetUrl';

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

type WhitelistStatus = 'whitelisted' | 'pending' | 'not_in_server' | 'unknown';

interface WhitelistResponse {
  status: WhitelistStatus;
  message: string;
  roles?: string[];
}

export default function WhitelistPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<WhitelistResponse | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!user.id) {
      setStatus('error');
      setErrorDetail('no_id');
      return;
    }

    const base = import.meta.env.BASE_URL || '/';
    const apiUrl =
      (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
      window.location.origin + (base === '/' ? '' : base.replace(/\/$/, ''));

    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch(
          `${apiUrl}/api/whitelist/status?userId=${encodeURIComponent(user!.id!)}`
        );
        if (cancelled) return;
        if (res.ok) {
          const json = (await res.json()) as WhitelistResponse;
          setData(json);
          setStatus('success');
          setErrorDetail(null);
        } else {
          const errBody = await res.text();
          setErrorDetail(`api_${res.status}`);
          setStatus('error');
          if (import.meta.env.DEV) {
            console.error('Whitelist API error:', res.status, errBody);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setErrorDetail('network');
          setStatus('error');
          if (import.meta.env.DEV) {
            console.error('Whitelist fetch failed:', err);
          }
        }
      }
    }

    fetchStatus();
    return () => {
      cancelled = true;
    };
  }, [user, navigate]);

  if (!user) return null;

  const statusColor =
    data?.status === 'whitelisted'
      ? 'success'
      : data?.status === 'pending'
        ? 'warning'
        : data?.status === 'not_in_server'
          ? 'error'
          : 'default';

  const statusLabel =
    data?.status === 'whitelisted'
      ? 'En la whitelist'
      : data?.status === 'pending'
        ? 'Pendiente'
        : data?.status === 'not_in_server'
          ? 'No estás en el servidor'
          : 'Desconocido';

  return (
    <>
      <AppAppBar />
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
                height: 48,
                width: 'auto',
                maxWidth: 160,
                objectFit: 'contain',
                mb: 3,
              }}
            />
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#fff' }}>
              Estado de Whitelist
            </Typography>

            {status === 'loading' && (
              <>
                <CircularProgress sx={{ my: 3, color: '#fff' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Comprobando tu estado...
                </Typography>
              </>
            )}

            {status === 'success' && data && (
              <>
                <Chip
                  label={statusLabel}
                  color={statusColor}
                  sx={{ mb: 2, fontWeight: 600 }}
                />
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}
                >
                  {data.message}
                </Typography>
                {data.status === 'not_in_server' && (
                  <Button
                    variant="contained"
                    color="primary"
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unirse al Discord
                  </Button>
                )}
              </>
            )}

            {status === 'error' && (
              <>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                  {errorDetail === 'no_id'
                    ? 'Tu sesión no tiene los datos necesarios. Cierra sesión e inicia sesión de nuevo con Discord para ver tu estado de whitelist.'
                    : errorDetail === 'network'
                      ? 'No se pudo conectar con el servidor. Si estás en local, añade VITE_API_URL en .env apuntando a tu despliegue en Vercel.'
                      : 'No se pudo conectar con el servidor. Inténtalo más tarde.'}
                </Typography>
                {errorDetail === 'no_id' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      localStorage.removeItem('bloodrp_auth');
                      const base = import.meta.env.BASE_URL || '/';
                      window.location.href = base === '/' ? '/' : base;
                    }}
                    sx={{ mb: 2 }}
                  >
                    Cerrar sesión e iniciar de nuevo
                  </Button>
                )}
              </>
            )}

            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ mt: 3, borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
    </>
  );
}
