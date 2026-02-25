import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { assetUrl } from '../../utils/assetUrl';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(0, 50%, 30%, 0.3)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  boxShadow: '0 0 24px 12px hsla(0, 50%, 20%, 0.3)',
  backgroundImage: `url(${assetUrl('image1.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 500,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(0, 0%, 0%, 0.6)',
    outlineColor: 'hsla(0, 50%, 20%, 0.2)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

const YOUTUBE_VIDEO_ID = 'oTmImIk9Ukk';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

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
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 100%)',
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
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsla(0, 70%, 25%, 0.1), transparent)',
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
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Box
            component="img"
            src={assetUrl('LOGO_png.png')}
            alt="Blood RP"
            sx={{
              height: { xs: 80, sm: 100, md: 120 },
              width: 'auto',
              maxWidth: { xs: 280, sm: 340, md: 400 },
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
            }}
          >
            Bienvenido a&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Blood RP
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            El servidor de roleplay más intenso de FiveM. Vive historias únicas,
            forma parte de facciones y experimenta un mundo abierto lleno de
            acción y drama.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor="discord-hero" sx={visuallyHidden}>
              Usuario de Discord
            </InputLabel>
            <TextField
              id="discord-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Tu usuario de Discord"
              placeholder="Tu usuario de Discord"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': 'Tu usuario de Discord',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unirse al Discord
            </Button>
          </Stack>
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
        </Stack>
        <StyledBox id="image" />
      </Container>
      </Box>
    </Box>
  );
}
