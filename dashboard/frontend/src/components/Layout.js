import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { NAV_OPTIONS } from './common/data';
import { Outlet, useLocation, Link } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Projects', icon: <FolderIcon /> },
  { text: 'Work History', icon: <WorkIcon /> },
  { text: 'Skills', icon: <StarIcon /> },
  { text: 'Testimonials', icon: <StarIcon /> },
  { text: 'About Me', icon: <InfoIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Admin Portal
          </Typography>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 1 }}>S</Avatar>
            <Typography variant="subtitle1">Shivkumar Suthar</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> {/* Push content below AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {NAV_OPTIONS.map((item, index) => {

              const isActive =
                item.url === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.url);



              const IconComponent = item.icon;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.url}
                    selected={isActive}
                  >
                    <ListItemIcon>
                      <IconComponent />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>


      <Box
        sx={{
          height: 'calc(100vh - 85px)',
          width: '100%',
          padding: '5px 14px 0px 14px',
          marginTop: '70px'
        }}
      >
        <Outlet />

      </Box>


    </Box>
  );
}
