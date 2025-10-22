import { useMemo, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
  Box,
  Skeleton,
  CardMedia
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { pickCover } from '../utils/assets';
import slugify from '../utils/slugify';

const DEFAULT_MEDIA_BG = '#2b2b2b';

const catLabel = (cat, lang) =>
  lang === 'en'
    ? cat === 'graphic'
      ? 'Graphic'
      : cat === 'uxui'
      ? 'UX-UI'
      : 'Software'
    : cat === 'graphic'
    ? 'Gráfico'
    : cat === 'uxui'
    ? 'UX-UI'
    : 'Software';

const catColorKey = (cat) =>
  cat === 'graphic' ? 'secondary' : cat === 'uxui' ? 'primary' : 'success';

export default function ProjectCard({ project, lang = 'es' }) {
  const cover = useMemo(() => pickCover(project), [project]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(!cover);

  const category = project.category || 'graphic';
  const toHref = `/project/${
    project.slug || project.id || slugify(project.title || '')
  }`;

  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        aspectRatio: '1 / 1',
        height: { xs: 300, sm: 260, md: 300 },
        boxShadow: 'none',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={toHref}
        sx={{
          alignItems: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-start',
          p: 0
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: project.bgColor ?? DEFAULT_MEDIA_BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            m: 0,
            p: 0
          }}
        >
          {!loaded && !error && (
            <Skeleton variant='rectangular' width='100%' height='100%' />
          )}

          {cover && (
            <CardMedia
              component='img'
              image={cover}
              alt={project.title}
              onLoad={() => setLoaded(true)}
              onError={() => {
                setError(true);
                setLoaded(false);
              }}
              sx={{
                display: loaded && !error ? 'block' : 'none',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                m: 0
              }}
            />
          )}

          {error && (
            <Box
              sx={{
                inset: 0,
                position: 'absolute',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <Box
                component='img'
                src='/assets/logo.png'
                alt='placeholder'
                sx={{
                  width: { xs: 72, sm: 84, md: 96 },
                  height: 'auto',
                  opacity: 0.35,
                  filter: 'grayscale(1) contrast(0.95) brightness(1)',
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}

          <Chip
            label={catLabel(category, lang)}
            size='small'
            color={catColorKey(category)}
            variant='filled'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              height: 22,
              borderRadius: 999
            }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
