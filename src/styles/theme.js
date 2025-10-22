import { createTheme, alpha } from '@mui/material/styles';

export function createAppTheme(mode = 'light') {
  const isLight = mode === 'light';

  const palette = {
    mode,
    primary: {
      main: '#d66514',
      light: '#ea9558',
      dark: '#9b4910',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d4265d',
      light: '#e9608b',
      dark: '#8f1a3f',
      contrastText: '#ffffff'
    },
    success: {
      main: '#728a1e',
      light: '#b8db36',
      dark: '#4e5f13',
      contrastText: '#ffffff'
    },
    grey: {
      400: '#b7b7b7',
      600: '#474747',
      900: '#1c1c1c'
    },
    text: {
      primary: isLight ? '#1c1c1c' : '#f5f5f5',
      secondary: isLight ? '#474747' : '#c8c8c8'
    },
    divider: alpha(isLight ? '#1c1c1c' : '#f5f5f5', 0.12),
    background: {
      default: isLight ? '#ffffff' : '#121212',
      paper: isLight ? '#ffffff' : '#1b1b1b'
    },
    skillCategories: {
      frontend: {
        main: '#61dafb',
        light: '#9ee7ff',
        dark: '#21a0c4',
        contrastText: '#000000'
      },
      backend: {
        main: '#68d391',
        light: '#9ae6b4',
        dark: '#38a169',
        contrastText: '#000000'
      },
      design: {
        main: '#f687b3',
        light: '#fbb6ce',
        dark: '#e53e3e',
        contrastText: '#000000'
      },
      nocode: {
        main: '#f6ad55',
        light: '#fbd38d',
        dark: '#dd6b20',
        contrastText: '#000000'
      },
      ai: {
        main: '#9f7aea',
        light: '#c6adff',
        dark: '#553c9a',
        contrastText: '#ffffff'
      },
      tools: {
        main: '#4fd1c7',
        light: '#81e6d9',
        dark: '#319795',
        contrastText: '#000000'
      },
      productivity: {
        main: '#a0aec0',
        light: '#cbd5e0',
        dark: '#718096',
        contrastText: '#000000'
      },
      marketing: {
        main: '#f56565',
        light: '#fc8181',
        dark: '#e53e3e',
        contrastText: '#ffffff'
      }
    }
  };

  const theme = createTheme({
    palette,

    shape: { borderRadius: 16 },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
      }
    },
    typography: {
      fontFamily:
        '"Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      h1: {
        fontFamily: '"Poppins", ui-sans-serif, system-ui, sans-serif',
        letterSpacing: '-0.015em',
        fontWeight: 700,
        fontSize: 'clamp(28px, 4vw, 40px)'
      },
      h2: {
        fontFamily: '"Poppins", ui-sans-serif, system-ui, sans-serif',
        letterSpacing: '-0.015em',
        fontWeight: 700,
        fontSize: 'clamp(24px, 3vw, 32px)'
      },
      h3: {
        fontFamily: '"Poppins", ui-sans-serif, system-ui, sans-serif',
        letterSpacing: '-0.01em',
        fontWeight: 600,
        fontSize: 'clamp(20px, 2.4vw, 28px)'
      },
      button: { textTransform: 'none', fontWeight: 600 }
    },

    components: {
      MuiAppBar: {
        defaultProps: {
          position: 'sticky',
          color: 'default',
          elevation: 0
        },
        styleOverrides: {
          root: {
            backdropFilter: 'saturate(180%) blur(6px)',
            borderBottom: `1px solid ${alpha(
              isLight ? '#1c1c1c' : '#f5f5f5',
              0.08
            )}`,
            backgroundColor: isLight
              ? alpha('#ffffff', 0.8)
              : alpha('#1b1b1b', 0.8)
          }
        }
      },

      MuiContainer: {
        defaultProps: { maxWidth: 'lg' }
      },

      MuiLink: {
        defaultProps: { underline: 'hover' },
        styleOverrides: { root: { color: 'inherit' } }
      },

      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 12 }
        },
        variants: [
          {
            props: { variant: 'soft' },
            style: {
              backgroundColor: alpha(
                palette.primary.main,
                isLight ? 0.06 : 0.12
              )
            }
          }
        ]
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 9999 }
        }
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 16,
            paddingInline: 16,
            paddingBlock: 8,
            fontWeight: 600
          },
          containedPrimary: {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            transition:
              'background-color .15s ease, transform .06s ease, box-shadow .15s ease',
            '&:hover': {
              backgroundColor: palette.primary.dark
            },
            '&:active': {
              backgroundColor: palette.primary.dark,
              transform: 'translateY(1px)'
            },
            '&:focus-visible': {
              boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.28)}`
            }
          },
          containedSecondary: {
            backgroundColor: palette.secondary.main,
            color: palette.secondary.contrastText,
            '&:hover': { backgroundColor: palette.secondary.dark },
            '&:active': {
              backgroundColor: palette.secondary.dark,
              transform: 'translateY(1px)'
            },
            '&:focus-visible': {
              boxShadow: `0 0 0 3px ${alpha(palette.secondary.main, 0.28)}`
            }
          },
          outlined: {
            borderColor: alpha(isLight ? '#1c1c1c' : '#f5f5f5', 0.16),
            color: 'inherit',
            '&:hover': {
              borderColor: alpha(isLight ? '#1c1c1c' : '#f5f5f5', 0.32),
              backgroundColor: alpha(
                isLight ? '#1c1c1c' : '#f5f5f5',
                isLight ? 0.04 : 0.06
              )
            }
          },
          text: {
            '&:hover': {
              backgroundColor: alpha(
                palette.primary.main,
                isLight ? 0.06 : 0.12
              )
            },
            '&:focus-visible': {
              boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.2)}`
            }
          }
        }
      }
    }
  });

  return theme;
}

export function getSystemMode() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
