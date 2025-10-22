import { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useEmblaCarousel from 'embla-carousel-react';
import BrowserFrame from './BrowserFrame';
import MobileFrame from './MobileFrame';

function resolveAsset(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleaned = String(path).replace(/^\/+/, '');
  return `${base}${cleaned}`;
}

export default function ProjectImagesCarrousel({
  images = [],
  alt = '',
  lang = 'es',
  category = 'dev',
  title = ''
}) {
  const list = useMemo(
    () =>
      (Array.isArray(images) ? images : []).map(resolveAsset).filter(Boolean),
    [images]
  );
  const isGraphicProject = category === 'graphic';
  const isMobileProject = title.toLowerCase().includes('cestas de mimbre');

  const mobileGroups = useMemo(() => {
    if (!isMobileProject) return [];
    const groups = [];
    for (let i = 0; i < list.length; i += 3) {
      groups.push(list.slice(i, i + 3));
    }
    return groups;
  }, [list, isMobileProject]);

  const hasControls = isMobileProject
    ? mobileGroups.length > 1
    : list.length > 1;

  const [emblaRef, embla] = useEmblaCarousel({
    loop: hasControls,
    align: 'start',
    dragFree: false
  });

  const [selected, setSelected] = useState(0);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  const onPrev = () => embla && embla.scrollPrev();
  const onNext = () => embla && embla.scrollNext();
  const scrollTo = (i) => embla && embla.scrollTo(i);

  if (!list.length) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        mx: 'auto',
        width: '100%',
        maxWidth: isGraphicProject
          ? 600
          : { xs: '100%', sm: 800, md: 1100, lg: 1280 },
        overflowX: 'clip'
      }}
    >
      <Box
        ref={emblaRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100%',
          '::-webkit-scrollbar': { display: 'none' },
          cursor: hasControls ? 'grab' : 'default',
          '&:active': { cursor: hasControls ? 'grabbing' : 'default' },
          touchAction: 'pan-y'
        }}
        aria-label={
          lang === 'en'
            ? `Project images carousel for ${alt}`
            : `Carrusel de imágenes del proyecto ${alt}`
        }
        role='region'
      >
        <Stack
          direction='row'
          sx={{ display: 'flex', gap: 0, width: '100%', maxWidth: '100%' }}
        >
          {isMobileProject
            ? mobileGroups.map((group, groupIndex) => (
                <Box
                  key={`mobile-group-${groupIndex}`}
                  sx={{
                    flex: '0 0 100%',
                    userSelect: 'none',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 2, md: 3 }
                  }}
                >
                  {group.map((src, imgIndex) => (
                    <MobileFrame key={`${src}-${groupIndex}-${imgIndex}`}>
                      <Box
                        component='img'
                        src={src}
                        alt={`${alt} — ${groupIndex * 3 + imgIndex + 1}`}
                        loading='lazy'
                        onError={(e) => {
                          e.currentTarget.src = '/assets/logo.png';
                          e.currentTarget.style.objectFit = 'contain';
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          background: 'transparent'
                        }}
                      />
                    </MobileFrame>
                  ))}
                </Box>
              ))
            : list.map((src, i) => (
                <Box
                  key={`${src}-${i}`}
                  sx={{
                    flex: '0 0 100%',
                    userSelect: 'none',
                    maxWidth: '100%'
                  }}
                >
                  {isGraphicProject ? (
                    <Box
                      component='img'
                      src={src}
                      alt={`${alt} — ${i + 1}`}
                      loading='lazy'
                      onError={(e) => {
                        e.currentTarget.src = '/assets/logo.png';
                        e.currentTarget.style.objectFit = 'contain';
                      }}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: 600,
                        objectFit: 'contain',
                        display: 'block',
                        background: 'transparent',
                        borderRadius: '8px',
                        boxShadow: (theme) =>
                          `0 8px 24px ${
                            theme.palette.mode === 'dark'
                              ? 'rgba(0,0,0,0.35)'
                              : 'rgba(0,0,0,0.12)'
                          }`,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        backgroundColor: (theme) =>
                          theme.palette.background.paper
                      }}
                    />
                  ) : (
                    <BrowserFrame aspectRatio='1280/720'>
                      <Box
                        component='img'
                        src={src}
                        alt={`${alt} — ${i + 1}`}
                        loading='lazy'
                        onError={(e) => {
                          e.currentTarget.src = '/assets/logo.png';
                          e.currentTarget.style.objectFit = 'contain';
                        }}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          background: 'transparent'
                        }}
                      />
                    </BrowserFrame>
                  )}
                </Box>
              ))}
        </Stack>

        {hasControls && null}
      </Box>

      {hasControls && (
        <Box
          sx={{
            mt: { xs: 0.5, sm: 1 },
            display: 'flex',
            alignItems: 'center',
            px: { xs: 1, sm: 0 }
          }}
        >
          <IconButton
            onClick={onPrev}
            aria-label={
              lang === 'en'
                ? `Previous image of ${alt}`
                : `Imagen anterior de ${alt}`
            }
            size='large'
            disabled={!hasControls}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Stack direction='row' spacing={1}>
              {(isMobileProject ? mobileGroups : list).map((_, i) => (
                <Box
                  key={i}
                  onClick={() => scrollTo(i)}
                  role='button'
                  tabIndex={0}
                  aria-label={`${
                    lang === 'en'
                      ? `Go to slide ${i + 1} of ${alt}`
                      : `Ir a la imagen ${i + 1} de ${alt}`
                  }`}
                  aria-current={i === selected ? 'true' : 'false'}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    bgcolor: (t) =>
                      i === selected
                        ? t.palette.text.primary
                        : t.palette.divider,
                    opacity: i === selected ? 0.9 : 0.6,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Stack>
          </Box>
          <IconButton
            onClick={onNext}
            aria-label={
              lang === 'en'
                ? `Next image of ${alt}`
                : `Imagen siguiente de ${alt}`
            }
            size='large'
            disabled={!hasControls}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
