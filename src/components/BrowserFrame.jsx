import { Box } from '@mui/material';

export default function BrowserFrame({ children, aspectRatio = '16/9' }) {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: (theme) =>
          `0 8px 24px ${
            theme.palette.mode === 'dark'
              ? 'rgba(0,0,0,0.35)'
              : 'rgba(0,0,0,0.12)'
          }`,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
        aspectRatio
      }}
    >
      <Box
        sx={{
          height: { xs: 24, sm: 28, md: 32 },
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          px: 1,
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{
              width: { xs: 8, sm: 10, md: 12 },
              height: { xs: 8, sm: 10, md: 12 },
              borderRadius: '50%',
              backgroundColor: '#ff5f57'
            }}
          />
          <Box
            sx={{
              width: { xs: 8, sm: 10, md: 12 },
              height: { xs: 8, sm: 10, md: 12 },
              borderRadius: '50%',
              backgroundColor: '#ffbd2e'
            }}
          />
          <Box
            sx={{
              width: { xs: 8, sm: 10, md: 12 },
              height: { xs: 8, sm: 10, md: 12 },
              borderRadius: '50%',
              backgroundColor: '#28ca42'
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: {
            xs: 'calc(100% - 24px)',
            sm: 'calc(100% - 28px)',
            md: 'calc(100% - 32px)'
          },
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: (theme) => theme.palette.background.paper
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
