import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeading } from '@/components/layout/Section';
import { CountryGrid } from './CountryGrid';
import { countries, REGIONS } from '@/data/countries';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({
    title: t('nav.countries'),
    description: t('site.description'),
    locale,
    path: '/countries',
  });
}

export default async function CountriesPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return (
    <>
      <section className="bg-brand-50 border-b border-border">
        <Container className="py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand">{t('nav.countries')}</h1>
          <p className="mt-3 text-ink-muted max-w-3xl">{t('site.description')}</p>
        </Container>
      </section>
      <Section>
        <CountryGrid
          locale={locale}
          countries={countries.map(c => ({
            slug: c.slug,
            flag: c.flag,
            region: c.region,
            name: c.name[locale],
            difficulty: c.difficulty,
            avgDays: c.avgDays,
          }))}
          regions={REGIONS}
          regionLabels={Object.fromEntries(REGIONS.map(r => [r, t(`country.regions.${r}` as any)])) as any}
          searchPlaceholder={t('country.filter.search')}
          allLabel={t('country.filter.all')}
          noResultLabel={t('country.filter.noResult')}
          difficultyLabels={{
            '상': t('country.difficulty.상' as any),
            '중': t('country.difficulty.중' as any),
            '하': t('country.difficulty.하' as any),
          }}
          daysSuffix={t('country.daysSuffix')}
        />
      </Section>
    </>
  );
}
