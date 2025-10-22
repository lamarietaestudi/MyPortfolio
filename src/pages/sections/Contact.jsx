import { useMemo, useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Section from '../../components/Section';
import { socialLinks } from '../../data/social';

export default function Contact({ dict, lang = 'es' }) {
  const t = useMemo(() => dict?.contact || {}, [dict]);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: 'success', msg: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const to =
      String(socialLinks.email || '').replace(/^mailto:/i, '') ||
      'lamarietaestudi@gmail.com';
    const subject =
      (lang === 'en' ? 'Website contact' : 'Contacto web') +
      (form.name ? ` — ${form.name}` : '');
    const body =
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`.slice(
        0,
        1800
      );
    const href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setLoading(true);
    window.location.href = href;
    setLoading(false);
    setToast({ open: true, type: 'success', msg: t.success });
  };

  return (
    <Section
      id='contact'
      title={dict.nav.contact}
      sx={{ position: 'relative', overflowX: 'clip', pb: { xs: 8, md: 12 } }}
    >
      <Box
        sx={{
          position: 'relative',
          mt: { xs: 2, md: 3 }
        }}
      >
        <Stack spacing={2}>
          <Box
            component='form'
            onSubmit={onSubmit}
            sx={{
              alignSelf: 'center',
              width: '100%',
              maxWidth: 640,
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              backdropFilter: 'blur(6px)',
              bgcolor: (th) =>
                alpha(
                  th.palette.background.paper,
                  th.palette.mode === 'dark' ? 0.18 : 0.28
                ),
              border: '1px solid',
              borderColor: (th) =>
                alpha(
                  th.palette.common.black,
                  th.palette.mode === 'dark' ? 0.2 : 0.06
                )
            }}
          >
            <Stack spacing={1.5}>
              <TextField
                name='name'
                label={t.name}
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name='email'
                label={t.email}
                type='email'
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name='message'
                label={t.message}
                multiline
                minRows={4}
                value={form.message}
                onChange={handleChange}
                required
                fullWidth
              />
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontSize: '0.75rem', opacity: 0.7 }}
              >
                * {t.requiredFields}
              </Typography>
              <Button
                type='submit'
                disabled={loading}
                sx={(th) => ({
                  alignSelf: 'flex-end',
                  border: '1px solid',
                  borderColor: th.palette.success.main,
                  backgroundColor: alpha(th.palette.success.main, 0.12),
                  color: th.palette.success.main,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: alpha(th.palette.success.main, 0.2),
                    borderColor: th.palette.success.dark
                  }
                })}
              >
                {t.send}
              </Button>
            </Stack>
          </Box>

          <Stack
            direction='row'
            spacing={1.25}
            justifyContent='center'
            sx={{
              mt: 0.5,
              mb: 0,
              '& .MuiIconButton-root': (th) => ({
                backdropFilter: 'blur(6px)',
                backgroundColor: alpha(
                  th.palette.background.paper,
                  th.palette.mode === 'dark' ? 0.18 : 0.28
                ),
                border: '1px solid',
                borderColor: alpha(
                  th.palette.common.black,
                  th.palette.mode === 'dark' ? 0.2 : 0.06
                )
              })
            }}
          >
            <Tooltip title='LinkedIn'>
              <IconButton
                size='large'
                href={socialLinks.linkedin}
                target='_blank'
                rel='noopener'
                aria-label='LinkedIn'
              >
                <LinkedInIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Tooltip title='GitHub'>
              <IconButton
                size='large'
                href={socialLinks.github}
                target='_blank'
                rel='noopener'
                aria-label='GitHub'
              >
                <GitHubIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Tooltip title={lang === 'en' ? 'Email' : 'Email'}>
              <IconButton
                size='large'
                href={socialLinks.email}
                aria-label='Email'
              >
                <MailOutlineIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((s) => ({ ...s, open: false }))}
          severity={toast.type === 'success' ? 'success' : 'error'}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {t.success}
        </Alert>
      </Snackbar>
    </Section>
  );
}
