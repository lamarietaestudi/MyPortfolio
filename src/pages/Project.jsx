import { useMemo, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Typography, Chip, Grid, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { projectsEs } from '../data/projects-es';
import { projectsEn } from '../data/projects-en';
import navEs from '../data/nav-es';
import navEn from '../data/nav-en';
import slugify from '../utils/slugify';
import ProjectImagesCarrousel from '../components/ProjectImagesCarrousel';
import { useSEO } from '../hooks/useSEO';
import NotFound from './NotFound';
import { navigateBackToSection } from '../utils/navigation';

export default function Project({ lang = 'es' }) {
  const { id } = useParams();
  const es = lang === 'es';
  const dict = es ? navEs : navEn;
  const source = es ? projectsEs : projectsEn;

  const project = useMemo(() => {
    const list = Array.isArray(source) ? source : [];
    return (
      list.find((p) => p.id === id) ||
      list.find((p) => p.slug === id) ||
      list.find((p) => slugify(p.title || '') === id) ||
      null
    );
  }, [source, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useSEO({
    title: project
      ? `${project.title} | Maria Sola`
      : `${dict.seo.projectTitle} | Maria Sola`,
    description:
      project?.description?.split('\n\n')[0] ||
      `${dict.seo.projectTitle} ${project?.title || ''} ${
        dict.seo.projectDescription
      }. ${project?.tech?.join(', ') || ''}`,
    image: project?.mainImage || '/assets/logo.png',
    url: `${window.location.origin}/project/${id}`,
    type: 'article'
  });

  if (!project) {
    return <NotFound lang={lang} />;
  }

  const hasImages = Array.isArray(project.images) && project.images.length > 0;

  const sxSoftPrimary = (t) => ({
    border: '1px solid',
    borderColor: t.palette.primary.main,
    backgroundColor: alpha(t.palette.primary.main, 0.12),
    color: t.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: alpha(t.palette.primary.main, 0.2),
      borderColor: t.palette.primary.dark
    },
    '&:active': { transform: 'translateY(1px)' },
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${alpha(t.palette.primary.main, 0.22)}`
    }
  });

  const sxSoftSuccess = (t) => ({
    border: '1px solid',
    borderColor: t.palette.success.main,
    backgroundColor: alpha(t.palette.success.main, 0.12),
    color: t.palette.success.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: alpha(t.palette.success.main, 0.2),
      borderColor: t.palette.success.dark
    },
    '&:active': { transform: 'translateY(1px)' },
    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${alpha(t.palette.success.main, 0.22)}`
    }
  });

  return (
    <Box component='section' sx={{ py: 6, overflowX: 'hidden' }}>
      <Stack spacing={2}>
        <Box sx={{ width: '100%' }}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ mb: 1, width: '100%' }}
          >
            <Typography variant='h3' sx={{ mr: 2 }}>
              {project.title}
            </Typography>
            <Button
              onClick={() => navigateBackToSection('work', '/', id)}
              variant='outlined'
              sx={{ whiteSpace: 'nowrap' }}
              size='small'
            >
              {dict?.notFound?.goWork}
            </Button>
          </Stack>

          {project.description && (
            <Stack spacing={0.5} sx={{ mb: 2 }}>
              {project.description.split('\n\n').map((paragraph, index) => (
                <Typography
                  key={index}
                  variant='body1'
                  color='text.secondary'
                  sx={{
                    lineHeight: 1.4,
                    margin: index === 0 ? '0 0 0.5em 0' : '0.5em 0',
                    '&:last-child': { marginBottom: 0 }
                  }}
                >
                  {paragraph.trim()}
                </Typography>
              ))}
            </Stack>
          )}

          {hasImages && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <ProjectImagesCarrousel
                images={project.images}
                alt={project.title}
                lang={lang}
                category={project.category}
                title={project.title}
              />
            </Stack>
          )}
        </Box>

        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
              {(project.url || project.urlDeploy) && (
                <Button
                  href={project.url || project.urlDeploy}
                  target='_blank'
                  rel='noopener'
                  variant='text'
                  sx={sxSoftPrimary}
                >
                  {project.title?.toLowerCase().includes('cestas de mimbre')
                    ? lang === 'en'
                      ? 'Prototype'
                      : 'Prototipo'
                    : dict?.project?.viewProject}
                </Button>
              )}
              {project.urlCode && (
                <Button
                  href={project.urlCode}
                  target='_blank'
                  rel='noopener'
                  variant='text'
                  sx={sxSoftSuccess}
                >
                  {project.title?.toLowerCase().includes('cestas de mimbre')
                    ? 'Figma'
                    : dict?.project?.viewCode}
                </Button>
              )}
            </Stack>

            {Array.isArray(project.tech) && project.tech.length > 0 && (
              <Stack spacing={1}>
                <Typography variant='h6'>{dict?.project?.tech}</Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                  {project.tech.map((t, i) => (
                    <Chip key={i} label={t} size='small' />
                  ))}
                </Stack>
              </Stack>
            )}

            {Array.isArray(project.applications) &&
              project.applications.length > 0 && (
                <Stack spacing={1}>
                  <Typography variant='h6'>
                    {dict?.project?.applications}
                  </Typography>
                  <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                    {project.applications.map((item, i) => (
                      <Chip
                        key={i}
                        label={item}
                        size='small'
                        variant='outlined'
                      />
                    ))}
                  </Stack>
                </Stack>
              )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
