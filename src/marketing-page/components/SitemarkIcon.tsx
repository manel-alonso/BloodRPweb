import Box from '@mui/material/Box';
import { assetUrl } from '../../utils/assetUrl';

export default function SitemarkIcon() {
  return (
    <Box
      component="img"
      src={assetUrl('LOGO_png.png')}
      alt="Blood RP - Servidor de Roleplay FiveM"
      sx={{
        height: 56,
        width: 'auto',
        maxWidth: 220,
        mr: 2,
        objectFit: 'contain',
      }}
    />
  );
}
