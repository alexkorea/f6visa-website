import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { HanokEaves } from '@/components/ui/Taegeuk';
import { useMDXComponents } from '@/mdx-components';
import { getPageContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const page = getPageContent('terms', locale);
  return buildMetadata({
    title: page?.data?.title ?? 'Terms of Use',
    locale,
    path: '/terms',
  });
}

export default async function TermsPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  const page = getPageContent('terms', locale);
  if (!page) return null;
  const { content } = await compileMDX({
    source: page.body,
    components: useMDXComponents({}),
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });
  return (
    <>
      <section className="bg-hanji border-b-2 border-brand-700">
        <Container className="py-10">
          <div className="dancheong-band h-1 w-16 rounded-full mb-3" />
          <h1 className="text-3xl md:text-4xl font-black text-brand">{page.data.title}</h1>
          {page.data.updatedLabel && (
            <p className="mt-2 text-sm text-ink-subtle">{page.data.updatedLabel}</p>
          )}
        </Container>
        <HanokEaves color="#003478" height={8} />
      </section>
      <Section>
        {page.fellBack && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 max-w-3xl">
            {t('translation.draftBanner')}
          </div>
        )}
        <article className="prose-f6 max-w-3xl">{content}</article>
      </Section>
    </>
  );
}
