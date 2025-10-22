import { Paper, Stack, Chip, Typography, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Section from '../../components/Section';
import { skillsEs } from '../../data/skills-es';
import { skillsEn } from '../../data/skills-en';

export default function Skills({ dict, lang = 'es' }) {
  const data = lang === 'en' ? skillsEn : skillsEs;

  return (
    <Section
      id='skills'
      title={dict.nav.skills}
      sx={{ position: 'relative', overflowX: 'clip', pb: { xs: 12, md: 16 } }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mt: { xs: 2, md: 3 }
        }}
      >
        <Paper
          variant='outlined'
          sx={(th) => ({
            p: 2,
            minHeight: { xs: 240, md: 280 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
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
            )
          })}
        >
          <Typography variant='subtitle2' sx={{ letterSpacing: '.06em' }}>
            {lang === 'en' ? '# design & tech' : '# diseño y tecnologías'}
          </Typography>

          {data.technical.map((group, i) => (
            <Box
              key={group.title}
              sx={{ mb: i === data.technical.length - 1 ? 0 : 0.75 }}
            >
              <Typography
                variant='subtitle2'
                sx={{
                  mb: 1,
                  letterSpacing: '.06em'
                }}
              >
                {group.title}
              </Typography>

              <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                {group.items.map((it) => (
                  <Chip
                    key={it}
                    label={it}
                    size='small'
                    variant='outlined'
                    sx={(th) => {
                      const categoryColor =
                        th.palette.skillCategories?.[group.category];
                      return {
                        borderRadius: 999,
                        borderColor: categoryColor?.main || th.palette.divider,
                        color: '#ffffff',
                        backgroundColor: categoryColor
                          ? alpha(categoryColor.main, 0.15)
                          : 'transparent',
                        cursor: 'default'
                      };
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Paper>

        <Paper
          variant='outlined'
          sx={(th) => ({
            p: 2,
            minHeight: { xs: 240, md: 280 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
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
            )
          })}
        >
          <Typography
            variant='subtitle2'
            sx={{ letterSpacing: '.06em', mb: 1 }}
          >
            {lang === 'en'
              ? '# cros-funciontal skills'
              : '# competencias transversales'}
          </Typography>

          {data.professional.map((group, i) => (
            <Box
              key={group.title}
              sx={{ mb: i === data.professional.length - 1 ? 0 : 0.75 }}
            >
              <Typography
                variant='subtitle2'
                sx={{
                  mb: 1,
                  letterSpacing: '.06em'
                }}
              >
                {group.title}
              </Typography>

              <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                {group.items.map((it) => (
                  <Chip
                    key={it}
                    label={it}
                    size='small'
                    variant='outlined'
                    sx={(th) => ({
                      borderRadius: 999,
                      borderColor: th.palette.divider,
                      cursor: 'default'
                    })}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Paper>
      </Box>
    </Section>
  );
}
