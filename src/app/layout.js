// app/layout.js
'use client';
import './globals.css';

import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/theme';
import Header from '../components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
