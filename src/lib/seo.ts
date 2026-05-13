import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://f6visa.com';

export function getAlternates(path: string): Metadata['alternates'] {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${cleanPath === '/' ? '' : cleanPath}`;
  }
  return {
    canonical: `${SITE_URL}${cleanPath}`,
    languages: { ...languages, 'x-default': `${SITE_URL}/ko${cleanPath === '/' ? '' : cleanPath}` },
  };
}

export function buildMetadata(opts: {
  title: string;
  description?: string;
  locale: Locale;
  path: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: getAlternates(opts.path),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: `${SITE_URL}/${opts.locale}${opts.path}`,
      siteName: 'f6visa.com',
      locale: opts.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  };
}
