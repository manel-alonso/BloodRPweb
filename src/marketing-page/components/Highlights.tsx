import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

const items = [
  {
    icon: <SpeedRoundedIcon />,
    title: 'Servidor optimizado',
    description:
      'Rendimiento fluido sin lag. Scripts optimizados para una experiencia de juego impecable las 24 horas.',
  },
  {
    icon: <SecurityRoundedIcon />,
    title: 'Anti-cheat activo',
    description:
      'Protección contra trampas y exploits. Staff dedicado que mantiene el servidor limpio y justo para todos.',
  },
  {
    icon: <GroupsRoundedIcon />,
    title: 'Comunidad activa',
    description:
      'Más de miles de jugadores activos. Siempre hay alguien con quien rolear en Los Santos.',
  },
  {
    icon: <AutoAwesomeRoundedIcon />,
    title: 'Contenido único',
    description:
      'Scripts exclusivos, trabajos personalizados y eventos que no encontrarás en ningún otro servidor.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Soporte 24/7',
    description:
      'Staff disponible en Discord para ayudarte. Resolvemos dudas y reportes de forma rápida.',
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: 'Roleplay serio',
    description:
      'Normas claras y aplicación justa. Un entorno donde el roleplay de calidad es la prioridad.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
        backgroundImage: 'linear-gradient(180deg, hsl(0, 0%, 5%) 0%, hsl(0, 50%, 8%) 100%)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            ¿Por qué Blood RP?
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            El servidor de FiveM que combina lo mejor del roleplay: comunidad
            activa, scripts únicos, staff profesional y una experiencia que no
            olvidarás.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(0, 50%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'grey.700',
                  },
                transition: 'all 0.3s ease',
                }}
              >
                <Box sx={{ opacity: 0.9, color: 'primary.light', '& .MuiSvgIcon-root': { fontSize: 36 } }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
