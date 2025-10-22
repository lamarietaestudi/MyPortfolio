import navEs from './../data/nav-es';
import navEn from './../data/nav-en';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function Home({ lang = 'es' }) {
  const dict = lang === 'en' ? navEn : navEs;

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <Work dict={dict} lang={lang} />
      <Skills dict={dict} lang={lang} />
      <Experience dict={dict} lang={lang} />
      <Contact dict={dict} lang={lang} />
    </>
  );
}
