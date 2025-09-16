// src/components/Loading.js
'use client';

import React from 'react';
import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material';

const Loading = ({ 
  message = "Loading amazing content...", 
  brandName = "Portfolio",
  size = 60,
  showBrand = true,
  showDots = true,
  variant = "default" // "default", "minimal", "dots-only", "spinner-only"
}) => {
  const theme = useTheme();

  // Different loading variants
  const renderVariant = () => {
    switch (variant) {
      case "minimal":
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress
              sx={{
                color: theme.palette.primary.main,
                [`& .MuiCircularProgress-circle`]: {
                  strokeLinecap: 'round',
                },
              }}
              size={40}
              thickness={4}
            />
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          </Box>
        );

      case "dots-only":
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              {brandName}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[0, 1, 2, 3, 4].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    animation: `bounce 1.4s ease-in-out infinite both`,
                    animationDelay: `${index * 0.16}s`,
                    '@keyframes bounce': {
                      '0%, 80%, 100%': { transform: 'scale(0)' },
                      '40%': { transform: 'scale(1)' },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        );

      case "spinner-only":
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                sx={{ color: alpha(theme.palette.primary.main, 0.2) }}
                size={size}
                thickness={4}
                value={100}
              />
              <CircularProgress
                sx={{
                  color: theme.palette.primary.main,
                  position: 'absolute',
                  left: 0,
                  [`& .MuiCircularProgress-circle`]: { strokeLinecap: 'round' },
                }}
                size={size}
                thickness={4}
              />
            </Box>
          </Box>
        );

      default:
        return (
          <>
            {/* Animated Brand Name */}
            {showBrand && (
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)', opacity: 0.8 },
                    '50%': { transform: 'scale(1.05)', opacity: 1 },
                    '100%': { transform: 'scale(1)', opacity: 0.8 },
                  },
                }}
              >
                {brandName}
              </Typography>
            )}

            {/* Custom Spinning Loader */}
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
              <CircularProgress
                variant="determinate"
                sx={{ color: alpha(theme.palette.primary.main, 0.2) }}
                size={size}
                thickness={4}
                value={100}
              />
              <CircularProgress
                sx={{
                  color: theme.palette.primary.main,
                  position: 'absolute',
                  left: 0,
                  [`& .MuiCircularProgress-circle`]: { strokeLinecap: 'round' },
                }}
                size={size}
                thickness={4}
              />
            </Box>

            {/* Loading Text */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                animation: 'fadeInOut 1.5s ease-in-out infinite',
                '@keyframes fadeInOut': {
                  '0%': { opacity: 0.5 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.5 },
                },
              }}
            >
              {message}
            </Typography>

            {/* Progress Dots */}
            {showDots && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {[0, 1, 2].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      animation: `bounce 1.4s ease-in-out infinite both`,
                      animationDelay: `${index * 0.16}s`,
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </>
        );
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
      }}
    >
      {renderVariant()}
    </Box>
  );
};

export default Loading;