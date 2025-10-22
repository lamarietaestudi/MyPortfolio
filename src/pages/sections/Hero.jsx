import { Typography, Stack, Box, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Section from '../../components/Section';
import { navigateToSection } from '../../utils/navigation';

export default function Hero({ dict }) {
  return (
    <Section
      id='hero'
      noGutters
      sx={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        transform: 'translateY(-40px)'
      }}
    >
      <Stack
        spacing={2}
        alignItems='center'
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: { xs: '36ch', sm: '56ch', md: '72ch' },
          mx: 'auto',
          mb: { xs: 8, sm: 10, md: 12 }
        }}
      >
        <Typography
          variant='h1'
          component='h1'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: { xs: '.12em', sm: '.16em' },
            fontWeight: 800,
            fontSize: {
              xs: 'clamp(28px, 8vw, 40px)',
              sm: 'clamp(36px, 6vw, 56px)',
              md: 'clamp(48px, 5vw, 72px)'
            },
            lineHeight: 1.1
          }}
        >
          Maria Sola
        </Typography>

        <Typography
          variant='subtitle1'
          color='text.secondary'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: { xs: '.18em', sm: '.22em' },
            lineHeight: 1.35,
            textWrap: 'balance',
            wordBreak: 'keep-all'
          }}
        >
          {dict?.hero?.subtitle}
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 80, sm: 88, md: 106 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      >
        <IconButton
          onClick={() => navigateToSection('work')}
          sx={(th) => ({
            backdropFilter: 'blur(6px)',
            backgroundColor: alpha(
              th.palette.background.paper,
              th.palette.mode === 'dark' ? 0.18 : 0.28
            ),
            border: '1px solid',
            borderColor: alpha(
              th.palette.common.black,
              th.palette.mode === 'dark' ? 0.2 : 0.06
            ),
            borderRadius: '50%',
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            '&:hover': {
              backgroundColor: alpha(
                th.palette.background.paper,
                th.palette.mode === 'dark' ? 0.25 : 0.35
              )
            }
          })}
        >
          <KeyboardArrowDownIcon
            sx={{
              fontSize: { xs: 24, sm: 28 },
              color: 'text.primary'
            }}
          />
        </IconButton>
      </Box>
    </Section>
  );
}
