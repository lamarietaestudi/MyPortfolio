import { Box } from '@mui/material';

export default function MobileFrame({ children, sx = {} }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 180, sm: 220, md: 260 },
        margin: '0 auto',
        aspectRatio: '9/19.5',
        borderRadius: { xs: 1, sm: 1.5, md: 2 },
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '8px solid #2d2d2d',
        backgroundColor: '#2d2d2d',
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 80, sm: 100, md: 120 },
          height: { xs: 12, sm: 16, md: 20 },
          backgroundColor: '#2d2d2d',
          borderRadius: '0 0 4px 4px',
          zIndex: 2
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          borderRadius: { xs: 0.5, sm: 1, md: 1.5 },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
