'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Taegeuk, HanokEaves } from '@/components/ui/Taegeuk';
import { cn } from '@/lib/cn';

export function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const link = (path: string) => `/${locale}${path}`;

  const nav = [
    { href: link('/visa/f-6-1'), label: t('nav.f61') },
    { href: link('/visa/f-6-2'), label: t('nav.f62') },
    { href: link('/visa/f-6-3'), label: t('nav.f63') },
    { href: link('/countries'), label: t('nav.countries') },
    { href: link('/blog'), label: t('nav.blog') },
    { href: link('/about'), label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-hanji/95 backdrop-blur border-b-2 border-brand-700">
      {/* 단청 띠 */}
      <div className="dancheong-band h-1" />
      <Container className="flex items-center justify-between h-16">
        <Link href={link('/')} className="flex items-center gap-2.5 font-bold text-brand text-lg">
          <Taegeuk size={36} className="taegeuk-rotate" />
          <span className="font-bold tracking-tight">f6visa<span className="text-accent">.com</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map(n => (
            <Link key={n.href} href={n.href} className="text-sm text-ink hover:text-brand font-medium">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button href={link('/contact')} variant="accent" size="sm" className="hidden sm:inline-flex">
            {t('cta.consultShort')}
          </Button>
          <button
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-border"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
          </button>
        </div>
      </Container>
      {mobileOpen && (
        <div className={cn('lg:hidden border-t border-border bg-hanji')}>
          <Container className="py-3 flex flex-col gap-1">
            {nav.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)} className="py-2 text-sm font-medium text-ink hover:text-accent">
                {n.label}
              </Link>
            ))}
            <Button href={link('/contact')} variant="accent" size="md" className="mt-2 w-full">
              {t('cta.consult')}
            </Button>
          </Container>
        </div>
      )}
      {/* 한옥 처마 그림자 */}
      <HanokEaves color="#003478" height={10} className="opacity-90" />
    </header>
  );
}
