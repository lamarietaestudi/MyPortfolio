import Section from '../../components/Section';
import Gallery from '../../components/Gallery';

export default function Work({ dict, lang = 'es' }) {
  return (
    <Section
      id='work'
      title={dict.nav.work}
      sx={{
        position: 'relative',
        overflowX: 'clip',
        pb: { xs: 40, sm: 36, md: 32 }
      }}
    >
      <Gallery dict={dict} lang={lang} />
    </Section>
  );
}
