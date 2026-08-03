import { useEffect } from 'react';
import { SITE } from '../config';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({ title, description, path = '/', type = 'website' }: SEOProps) {
  useEffect(() => {
    const cleanPath = path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
    const url = `${SITE.url}${cleanPath}`;
    const pageTitle = title || SITE.title;
    const pageDescription = description || SITE.description;

    document.title = pageTitle;
    upsertMeta('name', 'description', pageDescription);
    upsertMeta('name', 'author', SITE.author);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', pageDescription);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', `${SITE.url}${SITE.image}`);
    upsertMeta('property', 'og:image:alt', `${SITE.name} portfolio`);
    upsertMeta('property', 'og:site_name', SITE.siteName);
    upsertMeta('property', 'og:locale', SITE.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', pageDescription);
    upsertMeta('name', 'twitter:image', `${SITE.url}${SITE.image}`);
    upsertMeta('name', 'twitter:creator', SITE.twitterHandle);

    upsertCanonical(url);
  }, [title, description, path, type]);

  return null;
}
