import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppAppBar from '../marketing-page/components/AppAppBar';

export default function ShopPage() {
  return (
    <>
      <AppAppBar />
      <Box sx={{ mt: 20, p: 4, textAlign: 'center' }}>
        <Typography variant="h4">Shop</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Próximamente...
        </Typography>
      </Box>
    </>
  );
}
