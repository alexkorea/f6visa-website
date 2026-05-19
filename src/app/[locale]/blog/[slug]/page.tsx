import { notFound } from 'next/navigation';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useMDXComponents } from '@/mdx-components';
import { getBlogContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { BLOG_POSTS, findBlogPost } from '@/data/blog-posts';
import type { Locale } from '@/i18n/config';
import { InlineCTAForm } from '@/components/InlineCTAForm';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const meta = findBlogPost(params.slug);
  if (!meta) return {};
  return buildMetadata({
    title: meta.title,
    description: meta.summary,
    locale: params.locale,
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: { locale: Locale; slug: string } }) {
  const meta = findBlogPost(params.slug);
  if (!meta) notFound();
  const post = getBlogContent(params.slug, params.locale);
  if (!post) notFound();
  const t = await getTranslations({ locale: params.locale });

  const { content } = await compileMDX({
    source: post.body,
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
          <Badge tone="accent" className="mb-3">{meta.badge}</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand">{meta.title}</h1>
          <p className="mt-3 text-ink-muted max-w-3xl leading-relaxed">{meta.summary}</p>
          <p className="mt-2 text-xs text-ink-subtle">{meta.date}</p>
        </Container>
      </section>
      <Section>
        {showDraftBanner && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {t('translation.draftBanner')}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article className="prose-f6 max-w-none">
            {content}
            <InlineCTAForm />
          </article>
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('cta.consult')}</div>
              <p className="text-sm text-ink-muted mb-4">{t('contact.subtitle')}</p>
              <Button href={`/${params.locale}/contact`} variant="default" className="w-full">
                {t('cta.consult')}
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('blogList.recentTitle')}</div>
              <ul className="space-y-2 text-sm">
                {BLOG_POSTS.filter(p => p.slug !== params.slug).slice(0, 5).map(p => (
                  <li key={p.slug}>
                    <Link href={`/${params.locale}/blog/${p.slug}`} className="hover:text-brand text-ink leading-snug">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
