import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { Taegeuk, HanokEaves } from '@/components/ui/Taegeuk';
import { Button } from '@/components/ui/Button';
import { useMDXComponents } from '@/mdx-components';
import { getPageContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({ title: t('nav.about'), locale, path: '/about' });
}

export default async function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  const link = (p: string) => `/${locale}${p}`;
  const page = getPageContent('about', locale);
  if (!page) return null;
  const { content } = await compileMDX({
    source: page.body,
    components: useMDXComponents({}),
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  return (
    <>
      <section className="relative bg-hanji border-b-2 border-brand-700 overflow-hidden">
        <div className="absolute -right-16 -bottom-12 opacity-10 pointer-events-none">
          <Taegeuk size={280} />
        </div>
        <Container className="py-12 md:py-16 relative">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="dancheong-band h-1 w-12 rounded-full" />
            <div className="text-xs font-bold tracking-widest text-accent uppercase">ABOUT</div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand">{page.data.title}</h1>
          {page.data.hero && (
            <p className="mt-4 text-lg text-ink-muted max-w-2xl leading-relaxed">{page.data.hero}</p>
          )}
        </Container>
        <HanokEaves color="#003478" height={10} />
      </section>

      <Section>
        {page.fellBack && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 max-w-3xl">
            {t('translation.draftBanner')}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 max-w-5xl">
          <article className="prose-f6 max-w-none">{content}</article>
          <aside className="space-y-4 self-start lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('cta.consult')}</div>
              <p className="text-sm text-ink-muted mb-4">{t('contact.subtitle')}</p>
              <Button href={link('/contact')} variant="default" className="w-full">
                {t('cta.consult')}
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
