import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // Fix position
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 1300, // Ensure it's on top of other elements
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '300px',
          height: '200px',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          p: 3,
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2, color: '#7c7dd6' }}>
          Processing! 
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: '#7c7dd6' }}>
        Please wait a moment...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
