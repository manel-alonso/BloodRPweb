import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

const stats = [
  { icon: <PeopleRoundedIcon />, value: '500+', label: 'Jugadores activos' },
  { icon: <ScheduleRoundedIcon />, value: '24/7', label: 'Servidor online' },
  { icon: <EmojiEventsRoundedIcon />, value: '50+', label: 'Trabajos' },
  { icon: <SecurityRoundedIcon />, value: '100%', label: 'Anti-cheat' },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const isNumber = /^\d+$/.test(value);

  if (!isNumber) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}{suffix}
      </motion.span>
    );
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {value}{suffix}
    </motion.span>
  );
}

export default function StatsSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 50%)',
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, sm: 3 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.08)',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      borderLeftColor: 'primary.main',
                      borderLeftWidth: 3,
                      borderLeftStyle: 'solid',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      '& .MuiSvgIcon-root': { fontSize: 32 },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: 'primary.main',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  >
                    <AnimatedCounter value={stat.value} />
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
