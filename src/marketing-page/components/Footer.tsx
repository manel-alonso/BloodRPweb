import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DiscordIcon from './DiscordIcon';
import SitemarkIcon from './SitemarkIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'© '}
      <Link color="text.secondary" href="#" sx={{ fontWeight: 600 }}>
        Blood RP
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Únete a la comunidad
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Entra en nuestro Discord para estar al día con novedades, eventos y
              conectar con otros jugadores.
            </Typography>
            <InputLabel htmlFor="discord-newsletter">Usuario de Discord</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="discord-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Tu usuario de Discord"
                placeholder="Tu usuario de Discord"
                slotProps={{
                  htmlInput: {
                    autoComplete: 'off',
                    'aria-label': 'Tu usuario de Discord',
                  },
                }}
                sx={{ width: '250px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unirse
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Servidor
          </Typography>
          <Link color="text.secondary" variant="body2" href="#features">
            Características
          </Link>
          <Link color="text.secondary" variant="body2" href="#testimonials">
            Opiniones
          </Link>
          <Link color="text.secondary" variant="body2" href="#highlights">
            Destacados
          </Link>
          <Link color="text.secondary" variant="body2" href="#pricing">
            VIP
          </Link>
          <Link color="text.secondary" variant="body2" href="#faq">
            FAQ
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Comunidad
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Normas
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Aplicar staff
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Reportar bug
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Legal
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Términos
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Privacidad
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Contacto
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            Política de privacidad
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            •{' '}
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Términos de uso
          </Link>
          <Copyright />
        </div>
        <IconButton
          color="inherit"
          size="small"
          href="https://discord.gg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <DiscordIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
