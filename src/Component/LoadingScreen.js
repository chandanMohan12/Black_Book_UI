import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Correct way to apply gradient using internal class name
const GradientLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundImage: 'linear-gradient(to right, #5EFFE4, #009279)',
  },
}));

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust for desired speed
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ width: 400, p: 3, textAlign: 'center', border: '1px solid #ccc' }}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#1c1c1c',
            color: 'white',
            fontWeight: 'bold',
            display: 'inline-block',
            px: 3,
            py: 1,
            transform: 'skewX(-10deg)',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ transform: 'skewX(10deg)' }}>
            B L A C K&nbsp;&nbsp;B O O K
          </Typography>
        </Box>

        {/* Message */}
        <Typography variant="body1" mb={2}>
          Setting things up.{' '}
          <Typography component="span" sx={{ color: '#00897b', fontWeight: 500 }}>
            Your data will be ready shortly.
          </Typography>
        </Typography>

        {/* Gradient progress bar */}
        <Box display="flex" alignItems="center" gap={1}>
          <GradientLinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1 }} />
          <Typography variant="body2">{`${progress}%`}</Typography>
        </Box>

        {/* Loading text */}
        <Typography
          variant="caption"
          sx={{ textAlign: 'left', mt: 1, color: '#26a69a', display: 'block' }}
        >
          loading...
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoadingScreen;
