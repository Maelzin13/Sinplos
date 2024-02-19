'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';

// project import
import Logo from 'components/logo';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH, ThemeMode } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// assets
import { MenuOutlined, LineOutlined } from '@ant-design/icons';

// ==============================|| COMPONENTS - APP BAR ||============================== //

const Header = () => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  const backColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[800];

  return (
    <AppBar sx={{ backgroundColor: backColor, boxShadow: 'none' }}>
      <Container disableGutters={matchDownMd}>
        <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
          <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Chip
              label={process.env.REACT_APP_VERSION}
              variant="outlined"
              size="small"
              color="secondary"
              sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              '& .header-link': { px: 1, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
            }}
            spacing={2}
          >
            <NextLink href={APP_DEFAULT_PATH} passHref legacyBehavior>
              <Link className="header-link" color="white" target="_blank" underline="none">
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/components-overview/buttons" passHref legacyBehavior>
              <Link className="header-link" color="primary" underline="none">
                Components
              </Link>
            </NextLink>
            <Link className="header-link" color="white" href="https://codedthemes.gitbook.io/mantis/" target="_blank" underline="none">
              Documentation
            </Link>
            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button
                  component={Link}
                  href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                  disableElevation
                  color="primary"
                  variant="contained"
                >
                  Purchase Now
                </Button>
              </AnimateButton>
            </Box>
          </Stack>
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <NextLink href={APP_DEFAULT_PATH} passHref legacyBehavior>
                <Button variant="outlined" size="small" color="warning" sx={{ mt: 0.5, height: 28 }}>
                  Dashboard
                </Button>
              </NextLink>
              <IconButton
                color="secondary"
                onClick={() => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened)}
                sx={{ '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.lighter' : 'secondary.dark' } }}
              >
                <MenuOutlined style={{ color: theme.palette.mode === ThemeMode.DARK ? 'inherit' : theme.palette.grey[100] }} />
              </IconButton>
            </Stack>
            <Drawer
              anchor="top"
              open={drawerToggle}
              onClose={drawerToggler(false)}
              sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
            >
              <Box
                sx={{
                  width: 'auto',
                  '& .MuiListItemIcon-root': {
                    fontSize: '1rem',
                    minWidth: 28
                  }
                }}
                role="presentation"
                onClick={drawerToggler(false)}
                onKeyDown={drawerToggler(false)}
              >
                <List>
                  <Link style={{ textDecoration: 'none' }} href="/login" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/components-overview/buttons" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="All Components" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link
                    style={{ textDecoration: 'none' }}
                    href="https://github.com/codedthemes/mantis-free-react-admin-template"
                    target="_blank"
                  >
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Free Version" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="https://codedthemes.gitbook.io/mantis/" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="https://codedthemes.support-hub.io/" target="_blank">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Support" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                    </ListItemButton>
                  </Link>
                  <Link
                    style={{ textDecoration: 'none' }}
                    href="https://mui.com/store/items/mantis-react-admin-dashboard-template/"
                    target="_blank"
                  >
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Purchase Now" primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }} />
                      <Chip color="primary" label="v1.0" size="small" />
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  handleDrawerOpen: PropTypes.func
};

export default Header;
