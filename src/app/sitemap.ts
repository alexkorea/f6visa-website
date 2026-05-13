import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { countries } from '@/data/countries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://f6visa.com';

const STATIC_PATHS = [
  '/',
  '/visa/f-6-1',
  '/visa/f-6-2',
  '/visa/f-6-3',
  '/countries',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of STATIC_PATHS) {
    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}/${l}${path === '/' ? '' : path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${SITE_URL}/${loc}${path === '/' ? '' : path}`])
          ),
        },
      });
    }
  }
  for (const c of countries) {
    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}/${l}/countries/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${SITE_URL}/${loc}/countries/${c.slug}`])
          ),
        },
      });
    }
  }
  return entries;
}
