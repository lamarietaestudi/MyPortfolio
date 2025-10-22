import { useMemo, useState, useEffect } from 'react';
import { Box, Tabs, Tab, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useEmblaCarousel from 'embla-carousel-react';
import { projectsEs } from '../data/projects-es';
import { projectsEn } from '../data/projects-en';
import ProjectCard from './ProjectCard';
import slugify from '../utils/slugify';

function normalize(list) {
  const arr = Array.isArray(list) ? list : [];
  return arr.map((p, i) => {
    const slug = p.slug || slugify(p.title || `project-${i}`);
    const id = p.id || slug || String(i);
    const category = p.category || 'graphic';
    return { ...p, id, slug, category };
  });
}

const tabsOrder = ['all', 'dev', 'uxui', 'graphic'];

export default function Gallery({ dict, lang = 'es' }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const slidesToShow = useMemo(() => {
    if (isXs) return 1;
    if (isMd) return 2;
    return 3;
  }, [isXs, isMd]);

  const source = lang === 'en' ? projectsEn : projectsEs;
  const all = useMemo(() => normalize(source), [source]);
  const [filter, setFilter] = useState('all');

  const visible = useMemo(() => {
    if (filter === 'all') {
      const devProjects = all.filter((p) => p.category === 'dev');
      const uxuiProjects = all.filter((p) => p.category === 'uxui');
      const graphicProjects = all.filter((p) => p.category === 'graphic');

      const reorderedDev = [...devProjects];
      const vetCardIndex = reorderedDev.findIndex(
        (p) =>
          p.title?.toLowerCase().includes('vetcard') ||
          p.slug?.toLowerCase().includes('vetcard') ||
          p.id?.toLowerCase().includes('vetcard')
      );

      if (vetCardIndex > 0) {
        const vetCard = reorderedDev.splice(vetCardIndex, 1)[0];
        reorderedDev.unshift(vetCard);
      }

      return [...reorderedDev, ...uxuiProjects, ...graphicProjects];
    }
    return all.filter((p) => p.category === filter);
  }, [all, filter]);

  const emblaOptions = useMemo(
    () => ({
      loop: visible.length > slidesToShow,
      align: 'start',
      dragFree: true,
      skipSnaps: false
    }),
    [visible.length, slidesToShow]
  );

  const [emblaRef, embla] = useEmblaCarousel(emblaOptions);

  useEffect(() => {
    if (!embla) return;
    embla.reInit();
  }, [embla, visible, slidesToShow]);

  useEffect(() => {
    if (!embla || !visible.length) return;

    const savedProjectId = sessionStorage.getItem('workProjectId');
    if (savedProjectId) {
      const projectIndex = visible.findIndex(
        (project) =>
          project.id === savedProjectId ||
          project.slug === savedProjectId ||
          slugify(project.title || '') === savedProjectId
      );

      if (projectIndex !== -1) {
        embla.scrollTo(projectIndex, false);
        sessionStorage.removeItem('workProjectId');
      }
    } else if (filter === 'all') {
      embla.scrollTo(0, false);
    }
  }, [embla, visible, filter]);

  const onPrev = () => embla && embla.scrollPrev();
  const onNext = () => embla && embla.scrollNext();

  const navButtonsDisabled = visible.length <= slidesToShow;

  const NavigationButtons = (
    <Box sx={{ display: 'flex', gap: { xs: 2, sm: 0 } }}>
      <IconButton
        onClick={onPrev}
        aria-label='Anterior'
        size='large'
        disabled={navButtonsDisabled}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={onNext}
        aria-label='Siguiente'
        size='large'
        disabled={navButtonsDisabled}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        variant={isXs ? 'fullWidth' : 'scrollable'}
        scrollButtons
        allowScrollButtonsMobile
        sx={{ width: '100%', margin: '24px 0px 24px 0px' }}
      >
        {tabsOrder.map((key) => (
          <Tab
            key={key}
            value={key}
            label={dict.filters[key]}
            sx={{
              px: { xs: 1 },
              minWidth: { xs: 'auto' }
            }}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 320, sm: 350, md: 350 },
          position: 'relative'
        }}
      >
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flex: '0 0 56px' }}>
          <IconButton
            onClick={onPrev}
            aria-label='Anterior'
            size='large'
            disabled={navButtonsDisabled}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <Box
          ref={emblaRef}
          sx={{ flex: '1 1 0%', width: '100%', overflow: 'hidden' }}
        >
          <Box sx={{ display: 'flex' }}>
            {visible.map((p) => (
              <Box
                key={p.id}
                sx={{
                  flex: `0 0 ${100 / slidesToShow}%`,
                  maxWidth: `${100 / slidesToShow}%`,
                  px: { xs: 0, sm: 1 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ProjectCard project={p} lang={lang} />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flex: '0 0 56px' }}>
          <IconButton
            onClick={onNext}
            aria-label='Siguiente'
            size='large'
            disabled={navButtonsDisabled}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {isXs && (
          <Box
            sx={{ position: 'absolute', bottom: -50, display: 'flex', gap: 2 }}
          >
            <IconButton
              onClick={onPrev}
              aria-label='Anterior'
              size='large'
              disabled={navButtonsDisabled}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={onNext}
              aria-label='Siguiente'
              size='large'
              disabled={navButtonsDisabled}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
