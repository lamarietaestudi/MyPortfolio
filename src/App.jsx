import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { createAppTheme, getSystemMode } from './styles/theme';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import navEs from './data/nav-es';
import navEn from './data/nav-en';
import AppBackground from './components/graphics/AppBackground';

export default function App() {
  const lang = 'es';
  const dict = lang === 'en' ? navEn : navEs;
  const mode = getSystemMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBackground />
      <BrowserRouter>
        <Box
          sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <Header dict={dict} lang={lang} />
          <Box component='main' sx={{ flexGrow: 1, display: 'flex' }}>
            <Container sx={{ pt: 0, pb: 4, flexGrow: 1 }}>
              <AppRoutes lang={lang} />
            </Container>
          </Box>
          <Footer dict={dict} />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
