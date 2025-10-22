import { Box, Container, Typography } from '@mui/material';

export default function Footer({ dict }) {
  const year = new Date().getFullYear();
  const rights = dict?.footer?.rights ?? 'Todos los derechos reservados';

  return (
    <Box
      component='footer'
      role='contentinfo'
      sx={{
        borderTop: (t) => `1px solid ${t.palette.divider}`,
        overflowX: 'clip'
      }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 2, display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant='caption' color='text.secondary'>
          © {year} {rights}
        </Typography>
      </Container>
    </Box>
  );
}
