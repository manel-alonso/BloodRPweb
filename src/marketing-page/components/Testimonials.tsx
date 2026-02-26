import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const userTestimonials = [
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>JM</Avatar>,
    name: 'Juan Martínez',
    occupation: 'Jugador desde 2024',
    testimonial:
      '¡El mejor servidor de roleplay en español! La comunidad es increíble y el nivel de inmersión es altísimo. Llevo meses jugando y no me canso.',
  },
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>LR</Avatar>,
    name: 'Laura Rodríguez',
    occupation: 'EMS - Paramédico',
    testimonial:
      'El staff es muy profesional y el servidor está súper optimizado. Nunca tuve lag y el roleplay médico es muy completo. ¡Totalmente recomendado!',
  },
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>CP</Avatar>,
    name: 'Carlos Pérez',
    occupation: 'Policía - LSPD',
    testimonial:
      'Las facciones están muy bien organizadas. El sistema de rangos es justo y hay eventos constantes. Blood RP se ha convertido en mi servidor favorito.',
  },
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>MG</Avatar>,
    name: 'María González',
    occupation: 'Jugadora casual',
    testimonial:
      'Empecé sin saber nada de roleplay y la comunidad me ayudó mucho. Ahora tengo mi propio negocio en el servidor. Experiencia 10/10.',
  },
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>DS</Avatar>,
    name: 'David Sánchez',
    occupation: 'Mecánico',
    testimonial:
      'Los scripts son de lo mejor que he visto. El taller tiene mecánicas realistas y el sistema de economía tiene mucho sentido. Servidor serio.',
  },
  {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>AL</Avatar>,
    name: 'Ana López',
    occupation: 'VIP Premium',
    testimonial:
      'Vale totalmente la pena el VIP. Los beneficios son geniales y además apoyas al servidor. El equipo de desarrollo se esfuerza mucho.',
  },
];

export default function Testimonials() {
  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Lo que dicen nuestros jugadores
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          La comunidad de Blood RP habla por sí sola. Descubre las experiencias
          de quienes ya forman parte del servidor.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              style={{ width: '100%', display: 'flex' }}
            >
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                width: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 20px rgba(180,0,0,0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  &quot;{testimonial.testimonial}&quot;
                </Typography>
              </CardContent>
              <CardHeader
                avatar={testimonial.avatar}
                title={testimonial.name}
                subheader={testimonial.occupation}
              />
            </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
