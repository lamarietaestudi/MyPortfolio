import { useEffect } from 'react';

export function useSEO({ title, description, image, url, type = 'website' }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const updateMetaTag = (property, content) => {
      let meta =
        document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`);

      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    if (description) {
      updateMetaTag('description', description);
    }

    if (title) updateMetaTag('og:title', title);
    if (description) updateMetaTag('og:description', description);
    if (image) updateMetaTag('og:image', image);
    if (url) updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);

    if (title) updateMetaTag('twitter:title', title);
    if (description) updateMetaTag('twitter:description', description);
    if (image) updateMetaTag('twitter:image', image);
    if (url) updateMetaTag('twitter:url', url);
  }, [title, description, image, url, type]);
}
