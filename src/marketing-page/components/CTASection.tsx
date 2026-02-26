import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export default function CTASection() {
  return (
    <Box
      sx={{
        py: { xs: 8, sm: 12 },
        position: 'relative',
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
          background:
            'linear-gradient(135deg, rgba(120,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, rgba(80,0,0,0.15) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'rgba(255,255,255,0.1)',
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(180,0,0,0.08), transparent)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                padding: 1,
                background: 'linear-gradient(135deg, rgba(255,68,68,0.2), transparent, rgba(255,68,68,0.1))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontFamily: 'Rajdhani, sans-serif',
                background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ¿Listo para vivir la experiencia?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}
            >
              Únete a miles de jugadores en Los Santos. Crea tu personaje, elige tu camino
              y escribe tu propia historia.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  boxShadow: '0 4px 24px rgba(180,0,0,0.4)',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(180,0,0,0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Empezar ahora
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
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(180,0,0,0.1)',
                  },
                }}
              >
                Unirse al Discord
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
