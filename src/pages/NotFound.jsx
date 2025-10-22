import { Box, Stack, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import navEs from '../data/nav-es';
import navEn from '../data/nav-en';
import { navigateBackToSection } from '../utils/navigation';

export default function NotFound({ lang = 'es' }) {
  const dict = lang === 'en' ? navEn : navEs;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 }
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          backdropFilter: 'blur(6px)',
          bgcolor: (th) =>
            alpha(
              th.palette.background.paper,
              th.palette.mode === 'dark' ? 0.18 : 0.28
            ),
          border: '1px solid',
          borderColor: (th) =>
            alpha(
              th.palette.common.black,
              th.palette.mode === 'dark' ? 0.2 : 0.06
            ),
          textAlign: 'center'
        }}
      >
        <Stack spacing={3} alignItems='center'>
          <Typography
            variant='h1'
            component='h1'
            sx={{
              fontSize: {
                xs: 'clamp(48px, 8vw, 72px)',
                sm: 'clamp(64px, 6vw, 96px)'
              },
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.1
            }}
          >
            404
          </Typography>

          <Stack spacing={2} alignItems='center'>
            <Typography
              variant='h3'
              component='h2'
              sx={{
                fontSize: {
                  xs: 'clamp(24px, 4vw, 32px)',
                  sm: 'clamp(28px, 3vw, 36px)'
                },
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {dict.notFound.title}
            </Typography>

            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.6,
                maxWidth: 400
              }}
            >
              {dict.notFound.description}
            </Typography>
          </Stack>

          <Button
            onClick={() => navigateBackToSection('hero')}
            variant='text'
            size='large'
            sx={(th) => ({
              border: '1px solid',
              borderColor: th.palette.primary.main,
              backgroundColor: alpha(th.palette.primary.main, 0.12),
              color: th.palette.primary.main,
              fontWeight: 600,
              borderRadius: 2,
              py: 1.5,
              px: 3,
              '&:hover': {
                backgroundColor: alpha(th.palette.primary.main, 0.2),
                borderColor: th.palette.primary.dark
              }
            })}
          >
            {dict.notFound.backHome}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
