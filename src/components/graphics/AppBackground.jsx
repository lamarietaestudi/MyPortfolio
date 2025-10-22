import { Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

export default function AppBackground({ sx }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const c1 = isDark ? theme.palette.primary.light : theme.palette.primary.main;
  const c2 = isDark
    ? theme.palette.secondary.light
    : theme.palette.secondary.main;
  const c3 = isDark
    ? theme.palette.info?.light || '#64b5f6'
    : theme.palette.info?.main || '#2196f3';

  const g1a = alpha(c1, 0.56);
  const g1b = alpha(c2, 0.28);
  const g2a = alpha(c2, 0.52);
  const g2b = alpha(c3, 0.24);

  const f1 = alpha(c1, isDark ? 0.26 : 0.2);
  const f2 = alpha(c2, isDark ? 0.24 : 0.18);
  const f3 = alpha(c2, isDark ? 0.22 : 0.16);
  const f4 = alpha(c3, isDark ? 0.2 : 0.14);

  const wire = alpha(theme.palette.text.primary, isDark ? 0.06 : 0.05);

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          top: 0,
          bottom: 0
        }}
      >
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 1200 3200'
          preserveAspectRatio='xMidYMid slice'
          role='img'
          aria-label='app background'
          style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
        >
          <defs>
            <linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor={g1a} />
              <stop offset='100%' stopColor={g1b} />
            </linearGradient>
            <linearGradient id='g2' x1='1' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor={g2a} />
              <stop offset='100%' stopColor={g2b} />
            </linearGradient>
          </defs>

          <g>
            <polygon points='-40,520 280,360 620,540 -40,840' fill='url(#g1)' />
            <polygon
              points='1240,180 840,240 1020,520 1240,640'
              fill='url(#g2)'
            />
            <polygon points='220,-60 760,-40 560,240 140,200' fill={f1} />
          </g>

          <g>
            <polygon points='520,420 840,360 660,580' fill={f2} />
            <polygon points='100,560 360,460 440,760 20,820' fill={f4} />
            <polygon points='860,680 1120,580 1260,820 940,820' fill={f3} />
            <polygon points='360,300 560,260 520,420 320,430' fill={f4} />
          </g>

          <g>
            <polygon
              points='-80,1280 240,1140 620,1300 360,1500 -80,1440'
              fill='url(#g1)'
            />
            <polygon
              points='1240,1680 920,1560 680,1700 880,1920 1240,1840'
              fill='url(#g2)'
            />
            <polygon points='160,2060 480,2020 360,2260' fill={f3} />
            <polygon points='980,2460 700,2420 820,2660' fill={f2} />
          </g>

          <g>
            <polygon
              points='-60,2660 300,2520 640,2660 420,2840 -60,2780'
              fill='url(#g2)'
            />
            <polygon points='1120,2920 880,2860 1000,3100' fill={f4} />
          </g>

          <g stroke={wire} strokeWidth='1' fill='none'>
            <polyline points='-40,620 260,520 520,600 780,520 1040,600 1240,540' />
            <polyline points='60,160 360,160 520,220 700,180 920,220 1160,210' />
            <polyline points='0,740 360,680 520,740 780,720 1040,760 1240,740' />
            <polyline points='-40,1560 200,1480 460,1400 740,1360 980,1320 1240,1280' />
            <polyline points='1240,1960 980,1900 720,1860 460,1820 220,1780 -40,1740' />
            <polyline points='-40,2360 220,2320 460,2280 740,2240 980,2200 1240,2160' />
            <polyline points='1240,2860 1000,2800 760,2740 520,2700 260,2660 -40,2620' />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
