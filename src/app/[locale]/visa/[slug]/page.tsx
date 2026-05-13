import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useMDXComponents } from '@/mdx-components';
import { getVisaContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

const VALID = ['f-6-1', 'f-6-2', 'f-6-3'] as const;

export function generateStaticParams() {
  return VALID.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const v = getVisaContent(params.slug as any, params.locale);
  if (!v) return {};
  return buildMetadata({
    title: v.data.title,
    description: v.data.summary,
    locale: params.locale,
    path: `/visa/${params.slug}`,
  });
}

export default async function VisaPage({ params }: { params: { locale: Locale; slug: string } }) {
  if (!VALID.includes(params.slug as any)) notFound();
  const t = await getTranslations({ locale: params.locale });
  const v = getVisaContent(params.slug as any, params.locale);
  if (!v) notFound();
  const { content } = await compileMDX({
    source: v.body,
    components: useMDXComponents({}),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  const showDraftBanner = params.locale !== 'ko';
  return (
    <>
      <section className="bg-brand-50 border-b border-border">
        <Container className="py-10">
          <Badge tone="accent" className="mb-3">{v.data.title?.split(' ')[0]}</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand">{v.data.title}</h1>
          {v.data.summary && <p className="mt-3 text-ink-muted max-w-3xl leading-relaxed">{v.data.summary}</p>}
        </Container>
      </section>
      <Section>
        {showDraftBanner && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {t('translation.draftBanner')}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article className="prose-f6 max-w-none">{content}</article>
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('cta.consult')}</div>
              <p className="text-sm text-ink-muted mb-4">{t('contact.subtitle')}</p>
              <Button href={`/${params.locale}/contact`} variant="default" className="w-full">
                {t('cta.consult')}
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('nav.countries')}</div>
              <ul className="space-y-1.5 text-sm">
                <li><a href={`/${params.locale}/countries/vietnam`} className="hover:text-brand">🇻🇳 베트남</a></li>
                <li><a href={`/${params.locale}/countries/thailand`} className="hover:text-brand">🇹🇭 태국</a></li>
                <li><a href={`/${params.locale}/countries/philippines`} className="hover:text-brand">🇵🇭 필리핀</a></li>
                <li><a href={`/${params.locale}/countries/china`} className="hover:text-brand">🇨🇳 중국</a></li>
                <li><a href={`/${params.locale}/countries/japan`} className="hover:text-brand">🇯🇵 일본</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
