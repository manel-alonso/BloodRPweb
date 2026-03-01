import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const tiers = [
  {
    title: 'Jugador',
    price: '0',
    description: [
      'Acceso completo al servidor',
      'Sistema de economía',
      'Todos los trabajos disponibles',
      'Soporte en Discord',
    ],
    buttonText: 'Jugar gratis',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
  {
    title: 'VIP Premium',
    subheader: 'Recomendado',
    price: '1',
    description: [
      'Todo lo de Jugador',
      'Kit VIP exclusivo',
      'Prioridad en cola',
      'Vehículos exclusivos',
      'Casa/Vivienda premium',
      'Soporte prioritario',
    ],
    buttonText: 'Unirse al Discord',
    buttonVariant: 'contained',
    buttonColor: 'primary',
  },
  {
    title: 'VIP Élite',
    price: '1',
    description: [
      'Todo lo de VIP Premium',
      'Rangos exclusivos',
      'Eventos VIP',
      'Beneficios en facciones',
    ],
    buttonText: 'Más información',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
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
          Rangos VIP
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Blood RP es 100% gratuito para jugar. Los rangos VIP ofrecen beneficios
          exclusivos para quienes quieran apoyar el servidor.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {tiers.map((tier, index) => (
          <Grid
            size={{ xs: 12, sm: tier.title === 'VIP Élite' ? 12 : 6, md: 4 }}
            key={tier.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
            <Card
              sx={[
                {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                },
                tier.title === 'VIP Premium' &&
                  ((theme) => ({
                    border: '2px solid',
                    borderColor: 'primary.main',
                    background:
                      'radial-gradient(circle at 50% 0%, hsl(0, 70%, 25%), hsl(0, 0%, 6%))',
                    boxShadow: `0 8px 32px hsla(0, 50%, 30%, 0.4)`,
                    transform: { md: 'scale(1.05)' },
                    ...theme.applyStyles('dark', {
                      background:
                        'radial-gradient(circle at 50% 0%, hsl(0, 60%, 20%), hsl(0, 0%, 10%))',
                      boxShadow: `0 8px 32px hsla(0, 0%, 0%, 0.6)`,
                    }),
                  })),
                tier.title !== 'VIP Premium' && {
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px rgba(180,0,0,0.2)',
                  },
                },
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                    tier.title === 'VIP Premium'
                      ? { color: 'grey.100' }
                      : { color: '' },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'VIP Premium' && tier.subheader && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline',
                    },
                    tier.title === 'VIP Premium'
                      ? { color: 'grey.50' }
                      : { color: null },
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price > '0' ? 'Próximamente...' : `$${tier.price}`}
                  </Typography>
                  {tier.price !== '0' && (
                    <Typography component="h3" variant="h6">
                      &nbsp;por mes
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        { width: 20 },
                        tier.title === 'VIP Premium'
                          ? { color: 'primary.light' }
                          : { color: 'primary.main' },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={[
                        tier.title === 'VIP Premium'
                          ? { color: 'grey.50' }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as 'outlined' | 'contained'}
                  color={tier.buttonColor as 'primary' | 'secondary'}
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
