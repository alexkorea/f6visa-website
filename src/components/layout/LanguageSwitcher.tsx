'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeLabels, type Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [open, setOpen] = React.useState(false);

  const stripLocale = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) segments.shift();
    return '/' + segments.join('/');
  };

  const rest = stripLocale(pathname || '/');

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 h-9 text-sm bg-white hover:bg-brand-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{localeLabels[currentLocale].flag}</span>
        <span className="font-medium">{localeLabels[currentLocale].native}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" className="ml-1 opacity-70"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>
      </button>
      {open && (
        <div role="listbox" className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-white shadow-lg z-50">
          {locales.map(l => (
            <Link
              key={l}
              href={`/${l}${rest === '/' ? '' : rest}`}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm hover:bg-brand-50',
                l === currentLocale && 'bg-brand-50 font-semibold'
              )}
            >
              <span>{localeLabels[l].flag}</span>
              <span>{localeLabels[l].native}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
