// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Fira Code"',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2563eb' },
    background: {
      default: '#121212',
      paper: '#3D3D3D',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#A6A6A6',
    },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    divider: '#3D3D3D',
  },
  typography: {
    fontFamily: '"Fira Code"',
  },
});
