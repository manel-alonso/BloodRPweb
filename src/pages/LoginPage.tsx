import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DiscordIcon from '../marketing-page/components/DiscordIcon';
import { assetUrl } from '../utils/assetUrl';

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

const DISCORD_CLIENT_ID = (import.meta.env.VITE_DISCORD_CLIENT_ID as string) || '1476019662264467486';
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI as string | undefined;

function getDiscordAuthUrl(): string | null {
  const clientId = DISCORD_CLIENT_ID;
  if (!clientId || clientId === 'YOUR_CLIENT_ID') return null;
  const base = import.meta.env.BASE_URL || '/';
  const redirectUri =
    DISCORD_REDIRECT_URI ||
    new URL('auth/callback', window.location.origin + base).href;
  const scope = encodeURIComponent('identify email');
  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
}

export default function LoginPage() {
  const discordAuthUrl = getDiscordAuthUrl();

  const handleDiscordLogin = () => {
    if (discordAuthUrl) {
      window.location.href = discordAuthUrl;
    }
  };

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
      {/* Video background - same as Hero */}
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
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 100%)',
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
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#fff' }}>
              Iniciar sesión
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, maxWidth: 320, mx: 'auto', color: 'rgba(255,255,255,0.8)' }}
            >
              Únete a Blood RP con tu cuenta de Discord. Es rápido y seguro.
            </Typography>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleDiscordLogin}
              disabled={!discordAuthUrl}
              startIcon={<DiscordIcon />}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: '#5865F2',
                '&:hover': {
                  backgroundColor: '#4752C4',
                },
              }}
            >
              Continuar con Discord
            </Button>
            {!discordAuthUrl && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#f44336' }}>
                Configura VITE_DISCORD_CLIENT_ID en .env (ver .env.example)
              </Typography>
            )}

            <Typography variant="caption" sx={{ mt: 3, display: 'block', color: 'rgba(255,255,255,0.6)' }}>
              Al continuar, aceptas nuestros{' '}
              <Link href="#" sx={{ color: '#90caf9' }}>
                Términos
              </Link>{' '}
              y{' '}
              <Link href="#" sx={{ color: '#90caf9' }}>
                Política de privacidad
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
