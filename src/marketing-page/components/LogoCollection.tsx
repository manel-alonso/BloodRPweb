import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: { xs: 6, sm: 8 } }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'rgba(255,255,255,0.08)',
              bgcolor: 'rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, primary.main, transparent)',
                opacity: 0.6,
              },
            }}
          >
            <Typography
              component="p"
              variant="h6"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                mb: 1,
                fontFamily: 'Rajdhani, sans-serif',
              }}
            >
              Servidor de FiveM • Roleplay serio • 24/7 online
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Conecta con FiveM y busca &quot;Blood RP&quot; en la lista de servidores
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 500 }}>
              Abre FiveM → Buscar servidores → Escribe &quot;Blood RP&quot;
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
