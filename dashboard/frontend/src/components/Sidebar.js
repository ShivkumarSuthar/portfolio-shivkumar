import React from 'react';
import { NAV_OPTIONS } from '../constant';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const iconMap = {
  Home: <HomeIcon />,
  About: <InfoIcon />,
  Settings: <SettingsIcon />,
};

export default function Sidebar() {
  const location = useLocation();

  return (
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
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {NAV_OPTIONS.map((item, index) => {
            const isActive = location.pathname === item.url;

            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.url}
                  selected={isActive}
                >
                  <ListItemIcon>
                    {iconMap[item.label] || <HomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
