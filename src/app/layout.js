'use client';
import './globals.css';

import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from '../theme/theme';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const [isDark] = useState(false);
  const pathname = usePathname();

  // ✅ Check if current route is preview
  const isPreviewPage = pathname.startsWith('/preview');

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {/* Show Header/Footer only if NOT preview */}
          {!isPreviewPage && <Header />}
          {children}
          {!isPreviewPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
