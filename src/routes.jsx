import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Home = lazy(() => import('./pages/Home'));
const Project = lazy(() => import('./pages/Project'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function AppRoutes({ lang = 'es' }) {
  return (
    <Suspense
      fallback={
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='50vh'
          aria-label='Cargando página...'
        >
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        <Route path='/' element={<Home lang={lang} />} />
        <Route path='/project/:id' element={<Project lang={lang} />} />
        <Route path='*' element={<NotFound lang={lang} />} />
      </Routes>
    </Suspense>
  );
}
