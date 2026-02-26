import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import { useAuth } from '../../contexts/AuthContext';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" href="#features">
                Características
              </Button>
              <Button variant="text" color="info" size="small" href="#testimonials">
                Opiniones
              </Button>
              <Button variant="text" color="info" size="small" href="#highlights">
                Destacados
              </Button>
              <Button variant="text" color="info" size="small" href="#pricing">
                VIP
              </Button>
              <Button variant="text" color="info" size="small" href="#faq" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" href="#" sx={{ minWidth: 0 }}>
                Normas
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  sx={{ width: 28, height: 28 }}
                />
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                  {user.username}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                <Button
                  component={RouterLink}
                  to="/whitelist"
                  variant="text"
                  size="small"
                  color="inherit"
                  sx={{ minWidth: 0 }}
                >
                  Whitelist
                </Button>
                <Button
                  component={RouterLink}
                  to="/jobs"
                  variant="text"
                  size="small"
                  color="inherit"
                  sx={{ minWidth: 0 }}
                >
                  Jobs
                </Button>
                <Button
                  component={RouterLink}
                  to="/shop"
                  variant="text"
                  size="small"
                  color="inherit"
                  sx={{ minWidth: 0 }}
                >
                  Shop
                </Button>
              </Box>
            ) : (
              <Button color="primary" variant="text" size="small" component={RouterLink} to="/login">
                Iniciar sesión
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menú" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem component="a" href="#features" onClick={toggleDrawer(false)}>Características</MenuItem>
                <MenuItem component="a" href="#testimonials" onClick={toggleDrawer(false)}>Opiniones</MenuItem>
                <MenuItem component="a" href="#highlights" onClick={toggleDrawer(false)}>Destacados</MenuItem>
                <MenuItem component="a" href="#pricing" onClick={toggleDrawer(false)}>VIP</MenuItem>
                <MenuItem component="a" href="#faq" onClick={toggleDrawer(false)}>FAQ</MenuItem>
                <MenuItem component="a" href="#" onClick={toggleDrawer(false)}>Normas</MenuItem>
                <Divider sx={{ my: 3 }} />
                {user ? (
                  <>
                    <MenuItem onClick={toggleDrawer(false)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          src={user.avatar}
                          alt={user.username}
                          sx={{ width: 28, height: 28 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.username}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem component={RouterLink} to="/whitelist" onClick={toggleDrawer(false)}>
                      Whitelist
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/jobs" onClick={toggleDrawer(false)}>
                      Jobs
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/shop" onClick={toggleDrawer(false)}>
                      Shop
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={toggleDrawer(false)}>
                    <Button
                      component={RouterLink}
                      to="/login"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Iniciar sesión
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
