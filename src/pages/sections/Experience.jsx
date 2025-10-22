import { Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Section from '../../components/Section';
import { experienceEs } from '../../data/experience-es';
import { experienceEn } from '../../data/experience-en';

export default function Experience({ dict, lang = 'es' }) {
  const items = lang === 'en' ? experienceEn : experienceEs;

  return (
    <Section
      id='experience'
      title={dict.nav.expertise}
      sx={{ position: 'relative', overflowX: 'clip', pb: { xs: 8, md: 24 } }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
          mt: { xs: 2, md: 3 }
        }}
      >
        {items.map((item) => (
          <Paper
            key={item.id}
            variant='outlined'
            sx={(th) => ({
              height: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: 0.75,
              p: 2,
              borderRadius: 2,
              backdropFilter: 'blur(6px)',
              bgcolor: alpha(
                th.palette.background.paper,
                th.palette.mode === 'dark' ? 0.18 : 0.28
              ),
              border: '1px solid',
              borderColor: alpha(
                th.palette.common.black,
                th.palette.mode === 'dark' ? 0.2 : 0.06
              ),
              boxSizing: 'border-box',
              overflow: 'hidden'
            })}
          >
            <Typography
              variant='subtitle1'
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {item.position}
            </Typography>

            <Typography
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 700
              }}
            >
              {item.company}
            </Typography>

            <Typography variant='body2' color='text.secondary' fontWeight={400}>
              {item.period}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Section>
  );
}
