// Content collection helper. Lightweight contentlayer-lite pattern.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/config';

export interface CountryContent {
  slug: string;
  locale: Locale;
  data: {
    country?: string;
    region?: string;
    summary?: string;
    updatedAt?: string;
    [k: string]: unknown;
  };
  body: string;
  sections: {
    overview?: string;
    koreaFirst?: string;
    abroadFirst?: string;
  };
}

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export function getCountryContent(slug: string, locale: Locale): CountryContent | null {
  const file = path.join(CONTENT_ROOT, locale, 'countries', `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    if (locale !== 'ko') return getCountryContent(slug, 'ko'); // ko fallback
    return null;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    data,
    body: content,
    sections: splitSections(content),
  };
}

function splitSections(body: string) {
  const sections: CountryContent['sections'] = {};
  const overviewMatch = body.match(/##\s*개요[\s\S]*?(?=\n## |$)/);
  const koMatch = body.match(/##\s*한국에서 먼저[\s\S]*?(?=\n## |$)/);
  const abMatch = body.match(/##\s*현지에서 먼저[\s\S]*?(?=\n## |$)/);
  if (overviewMatch) sections.overview = overviewMatch[0];
  if (koMatch) sections.koreaFirst = koMatch[0];
  if (abMatch) sections.abroadFirst = abMatch[0];
  return sections;
}

export function getAllCountrySlugs(): string[] {
  const dir = path.join(CONTENT_ROOT, 'ko', 'countries');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

export function getVisaContent(slug: 'f-6-1' | 'f-6-2' | 'f-6-3', locale: Locale): { data: any; body: string } | null {
  const file = path.join(CONTENT_ROOT, locale, 'visa', `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    if (locale !== 'ko') return getVisaContent(slug, 'ko');
    return null;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const parsed = matter(raw);
  return { data: parsed.data, body: parsed.content };
}

export function getBlogContent(slug: string, locale: Locale): { data: any; body: string } | null {
  const file = path.join(CONTENT_ROOT, locale, 'blog', `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    if (locale !== 'ko') return getBlogContent(slug, 'ko');
    return null;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const parsed = matter(raw);
  return { data: parsed.data, body: parsed.content };
}

export function getPageContent(slug: string, locale: Locale): { data: any; body: string; fellBack: boolean } | null {
  const file = path.join(CONTENT_ROOT, locale, 'pages', `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    if (locale !== 'ko') {
      const ko = getPageContent(slug, 'ko');
      if (ko) return { ...ko, fellBack: true };
      return null;
    }
    return null;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  const parsed = matter(raw);
  return { data: parsed.data, body: parsed.content, fellBack: false };
}
