import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const drawerWidth = 240;

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
