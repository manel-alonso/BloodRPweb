import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        Servidor de FiveM • Roleplay serio • 24/7 online
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
          gap: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Conecta con FiveM y busca &quot;Blood RP&quot;
        </Typography>
      </Box>
    </Box>
  );
}
