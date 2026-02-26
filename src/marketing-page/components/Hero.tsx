import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { assetUrl } from '../../utils/assetUrl';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* YouTube video background - blurred */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: { xs: 600, sm: 700 },
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
        {/* Dark overlay for readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.92) 100%)',
          }}
        />
        {/* Subtle red vignette */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,0,0,0.15), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsla(0, 70%, 25%, 0.15), transparent)',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Stack
              spacing={2}
              useFlexGap
              sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
            >
              <motion.div variants={item}>
                <Box
                  component="img"
                  src={assetUrl('LOGO_png.png')}
                  alt="Blood RP"
                  sx={{
                    height: { xs: 80, sm: 100, md: 120 },
                    width: 'auto',
                    maxWidth: { xs: 280, sm: 340, md: 400 },
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 30px rgba(180,0,0,0.3))',
                  }}
                />
              </motion.div>
              <motion.div variants={item}>
                <Typography
                  variant="h1"
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                    fontWeight: 800,
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  Bienvenido a&nbsp;
                  <Typography
                    component="span"
                    variant="h1"
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 40px rgba(255,68,68,0.5)',
                    }}
                  >
                    Blood RP
                  </Typography>
                </Typography>
              </motion.div>
              <motion.div variants={item}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    width: { sm: '100%', md: '80%' },
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    margin: 'auto',
                  }}
                >
                  El servidor de roleplay más intenso de FiveM. Vive historias únicas,
                  forma parte de facciones y experimenta un mundo abierto lleno de
                  acción y drama.
                </Typography>
              </motion.div>
              <motion.div variants={item}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  useFlexGap
                  sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                >
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 20px rgba(180,0,0,0.4)',
                      '&:hover': {
                        boxShadow: '0 6px 28px rgba(180,0,0,0.5)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Jugar ahora
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderColor: 'rgba(255,255,255,0.4)',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(180,0,0,0.1)',
                      },
                    }}
                  >
                    Unirse al Discord
                  </Button>
                </Stack>
              </motion.div>
              
              <motion.div variants={item}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textAlign: 'center' }}
                >
                  Conecta FiveM y únete a nuestra comunidad. Al hacer clic aceptas
                  nuestros&nbsp;
                  <Link href="#" color="primary">
                    Términos y Reglas
                  </Link>
                  .
                </Typography>
              </motion.div>
            </Stack>
          </motion.div>
          
        </Container>
      </Box>
    </Box>
  );
}
