import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CountryTabs } from './CountryTabs';
import { useMDXComponents } from '@/mdx-components';
import { findCountryBySlug, countries } from '@/data/countries';
import { getCountryContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export function generateStaticParams() {
  return countries.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const c = findCountryBySlug(params.slug);
  if (!c) return {};
  const t = await getTranslations({ locale: params.locale });
  return buildMetadata({
    title: `${c.name[params.locale]} F-6 결혼비자 — ${t('site.tagline')}`,
    description: `${c.name[params.locale]} 국적 배우자와의 F-6 결혼비자 신청 절차와 필요서류를 확인하세요.`,
    locale: params.locale,
    path: `/countries/${params.slug}`,
  });
}

export default async function CountryDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const c = findCountryBySlug(params.slug);
  if (!c) notFound();
  const t = await getTranslations({ locale: params.locale });
  const content = getCountryContent(params.slug, params.locale);

  const renderMDX = async (md?: string) => {
    if (!md) return null;
    const { content: el } = await compileMDX({
      source: md,
      components: useMDXComponents({}),
      options: {
        mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
      },
    });
    return el;
  };

  const overviewEl = await renderMDX(content?.sections.overview ?? content?.body);
  const koEl = await renderMDX(content?.sections.koreaFirst);
  const abEl = await renderMDX(content?.sections.abroadFirst);
  const showDraftBanner = params.locale !== 'ko' && content?.locale === 'ko';

  return (
    <>
      <section className="bg-brand-50 border-b border-border">
        <Container className="py-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{c.flag}</span>
            <div>
              <Badge tone="muted" className="mb-1.5">{c.region}</Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand">{c.name[params.locale]} F-6 결혼비자</h1>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {c.difficulty && <Badge tone={c.difficulty === '상' ? 'danger' : c.difficulty === '중' ? 'accent' : 'success'}>{t('country.metaDifficulty')}: {c.difficulty}</Badge>}
            {c.avgDays && <Badge tone="muted">{t('country.metaDays')}: ~{c.avgDays}일</Badge>}
          </div>
          <div className="mt-5 flex gap-3">
            <Button href={`/${params.locale}/contact`} variant="default">{t('cta.consult')}</Button>
            <Button href={`/${params.locale}/tools/document-checklist?country=${c.slug}`} variant="outline">
              {t('cta.downloadChecklist')}
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        {showDraftBanner && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {t('translation.draftBanner')}
          </div>
        )}
        {overviewEl && <article className="prose-f6 max-w-none mb-10">{overviewEl}</article>}

        <CountryTabs
          koLabel={t('country.tabKoreaFirst')}
          abLabel={t('country.tabAbroadFirst')}
          koContent={koEl}
          abContent={abEl}
        />
      </Section>
    </>
  );
}
