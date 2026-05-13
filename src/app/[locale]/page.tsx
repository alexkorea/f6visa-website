import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeading } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Taegeuk, HanokEaves } from '@/components/ui/Taegeuk';
import { countries, FEATURED_SLUGS } from '@/data/countries';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({
    title: `${t('site.name')} — ${t('site.tagline')}`,
    description: t('site.description'),
    locale,
    path: '/',
  });
}

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  const link = (p: string) => `/${locale}${p}`;
  const featured = FEATURED_SLUGS.map(s => countries.find(c => c.slug === s)!).filter(Boolean);

  return (
    <>
      {/* Hero — 한국적 (한지·태극·단청) */}
      <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden bg-hanji">
        {/* 한지 텍스처 */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1A1A1A 0 1px, transparent 1px 12px)' }} />
        {/* 우측 거대 태극 워터마크 */}
        <div className="absolute -right-24 -top-12 opacity-10 pointer-events-none">
          <Taegeuk size={420} />
        </div>
        <Container>
          <div className="max-w-3xl relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="dancheong-band h-1 w-12 rounded-full" />
              <div className="text-sm font-bold text-accent tracking-widest uppercase">
                {t('home.hero.eyebrow')}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-brand leading-tight tracking-tight">
              {t('home.hero.title')}
            </h1>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-2xl">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={link('/contact')} variant="default" size="lg">
                {t('cta.consult')}
              </Button>
              <Button href={link('/countries')} variant="outline" size="lg">
                {t('nav.countries')}
              </Button>
            </div>
          </div>
        </Container>
        {/* 한옥 처마 하단 마감 */}
        <div className="absolute bottom-0 left-0 right-0">
          <HanokEaves color="#003478" height={14} />
          <div className="dancheong-band h-1" />
        </div>
      </section>

      {/* F-6 visa cards */}
      <Section className="bg-bg">
        <SectionHeading title={t('nav.visa')} description={t('site.description')} />
        <div className="grid gap-5 md:grid-cols-3">
          {(['f61', 'f62', 'f63'] as const).map(k => (
            <Card key={k} className="hover:shadow-md transition">
              <CardBody>
                <Badge tone="accent" className="mb-3">{t(`visa.${k}.label`)}</Badge>
                <CardTitle className="mb-2">{t(`visa.${k}.title`)}</CardTitle>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">{t(`visa.${k}.summary`)}</p>
                <Link href={link(`/visa/${k === 'f61' ? 'f-6-1' : k === 'f62' ? 'f-6-2' : 'f-6-3'}`)} className="text-sm font-semibold text-brand hover:underline">
                  {t('cta.viewMore')} →
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured countries */}
      <Section>
        <SectionHeading title={t('home.featuredCountries')} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featured.map(c => (
            <Link key={c.slug} href={link(`/countries/${c.slug}`)} className="group">
              <div className="flex items-center gap-3 rounded-md border border-border bg-white p-4 hover:border-brand transition">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <div className="font-semibold text-ink group-hover:text-brand">{c.name[locale]}</div>
                  <div className="text-xs text-ink-muted">{c.avgDays && `~${c.avgDays}d`}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button href={link('/countries')} variant="ghost" size="md">{t('cta.viewAll')} →</Button>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-brand text-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold">{t('home.process.title')}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {(['step1', 'step2', 'step3'] as const).map(k => (
            <div key={k} className="rounded-lg bg-white/10 backdrop-blur p-6">
              <div className="text-accent text-3xl font-bold mb-2">{k === 'step1' ? '01' : k === 'step2' ? '02' : '03'}</div>
              <div className="font-bold text-lg mb-1">{t(`home.process.${k}.title`)}</div>
              <p className="text-sm text-white/80 leading-relaxed">{t(`home.process.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust */}
      <Section>
        <SectionHeading title={t('home.trust.title')} align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map(i => (
            <Card key={i}>
              <CardBody>
                <CardTitle className="mb-2">{t(`home.trust.items.${i}.title`)}</CardTitle>
                <p className="text-sm text-ink-muted leading-relaxed">{t(`home.trust.items.${i}.desc`)}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-accent-50">
        <div className="rounded-xl bg-brand text-white p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">{t('contact.title')}</h3>
          <p className="text-white/85 mb-6">{t('contact.subtitle')}</p>
          <Button href={link('/contact')} variant="accent" size="lg">{t('cta.consult')}</Button>
        </div>
      </Section>
    </>
  );
}
