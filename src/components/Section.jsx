import { Box, Typography, Container } from '@mui/material';

export default function Section({
  id,
  title,
  subtitle,
  children,
  sx,
  titleProps,
  subtitleProps,
  containerProps,
  noGutters = false,
  bg = null
}) {
  return (
    <Box
      component='section'
      id={id}
      sx={{
        position: 'relative',
        scrollMarginTop: noGutters ? 0 : 88,
        py: noGutters ? 0 : { xs: 6, md: 10 },
        ...sx
      }}
      {...containerProps}
    >
      {bg}
      <Container maxWidth='lg'>
        {title && (
          <Box sx={{ mb: { xs: 0, md: 0 } }}>
            <Typography variant='h2' component='h2' {...titleProps}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ mt: 1 }}
                {...subtitleProps}
              >
                {subtitle}
              </Typography>
            ) : null}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}
