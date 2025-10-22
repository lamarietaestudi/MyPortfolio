import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import navEs from '../data/nav-es';
import navEn from '../data/nav-en';
import { navigateToSection, scrollToSection } from '../utils/navigation';

export default function Header({ dict, lang = 'es' }) {
  const d = dict ?? (lang === 'en' ? navEn : navEs);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const toggle = (v) => () => setOpen(v);

  const smoothScrollTo = (elementId) => {
    setActive(elementId);
    navigateToSection(elementId);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (
        h &&
        ['hero', 'work', 'skills', 'experience', 'contact'].includes(h)
      ) {
        setActive(h);
        scrollToSection(h, { updateHistory: false });
      } else {
        setActive('hero');
        if (window.location.pathname === '/') {
          window.history.replaceState(null, '', '/#hero');
        }
      }
    };

    const handleScroll = () => {
      const sections = ['hero', 'work', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          const newActive = sections[i];
          setActive((prevActive) => {
            if (newActive !== prevActive) {
              if (window.location.pathname === '/') {
                window.history.replaceState(null, '', `/#${newActive}`);
              }
              return newActive;
            }
            return prevActive;
          });
          break;
        }
      }
    };

    handleHashChange();

    const timeoutId = setTimeout(handleHashChange, 100);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const items = [
    { key: 'hero', label: d.nav.home, href: '/#hero' },
    { key: 'work', label: d.nav.work, href: '/#work' },
    { key: 'skills', label: d.nav.skills, href: '/#skills' },
    { key: 'experience', label: d.nav.expertise, href: '/#experience' },
    { key: 'contact', label: d.nav.contact, href: '/#contact' }
  ];

  return (
    <AppBar
      position='sticky'
      elevation={0}
      color='transparent'
      square
      component='header'
      role='banner'
      sx={{
        borderRadius: 0,
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        backdropFilter: 'saturate(180%) blur(8px)',
        backgroundColor: (t) =>
          t.palette.mode === 'light'
            ? 'rgba(255,255,255,0.8)'
            : 'rgba(0,0,0,0.5)',
        left: 0,
        right: 0,
        overflowX: 'clip'
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 64 }}>
          <MuiLink
            href='/#hero'
            underline='none'
            color='inherit'
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('hero');
            }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: 'pointer'
            }}
          >
            <Typography
              variant='subtitle2'
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              # maria sola
            </Typography>
          </MuiLink>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {items.map((it) => {
              const isActive = active === it.key;
              return (
                <MuiLink
                  key={it.key}
                  href={it.href}
                  underline='none'
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(it.key);
                  }}
                  sx={{
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? 'text.primary' : 'text.secondary',
                    position: 'relative',
                    cursor: 'pointer',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -8,
                      height: 2,
                      borderRadius: 1,
                      bgcolor: isActive ? 'text.primary' : 'transparent'
                    }
                  }}
                >
                  {it.label}
                </MuiLink>
              );
            })}
          </Box>

          <IconButton
            aria-label={
              lang === 'en'
                ? 'Open navigation menu'
                : 'Abrir menú de navegación'
            }
            aria-expanded={open}
            aria-controls='mobile-menu'
            onClick={toggle(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor='right'
            open={open}
            onClose={toggle(false)}
            id='mobile-menu'
            aria-label={
              lang === 'en' ? 'Navigation menu' : 'Menú de navegación'
            }
          >
            <Box sx={{ width: 260, p: 1 }}>
              <List
                role='navigation'
                aria-label={
                  lang === 'en' ? 'Main navigation' : 'Navegación principal'
                }
              >
                {items.map((it) => (
                  <ListItemButton
                    key={it.key}
                    onClick={() => {
                      smoothScrollTo(it.key);
                      toggle(false)();
                    }}
                    selected={active === it.key}
                  >
                    <ListItemText primary={it.label} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
