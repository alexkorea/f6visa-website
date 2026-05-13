import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { Taegeuk, HanokEaves } from '@/components/ui/Taegeuk';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BLOG_POSTS } from '@/data/blog-posts';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({ title: t('nav.blog'), locale, path: '/blog' });
}

export default async function BlogPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  const link = (p: string) => `/${locale}${p}`;

  return (
    <>
      <section className="relative bg-hanji border-b-2 border-brand-700 overflow-hidden">
        <div className="absolute -right-12 -bottom-8 opacity-10 pointer-events-none">
          <Taegeuk size={240} />
        </div>
        <Container className="py-12 md:py-16 relative">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="dancheong-band h-1 w-12 rounded-full" />
            <div className="text-xs font-bold tracking-widest text-accent uppercase">{t('blogList.tag')}</div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand">{t('nav.blog')}</h1>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl">{t('blogList.subtitle')}</p>
        </Container>
        <HanokEaves color="#003478" height={10} />
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map(p => (
            <Link key={p.slug} href={link(`/blog/${p.slug}`)} className="block group">
              <Card className="h-full hover:shadow-md group-hover:border-accent transition border-border">
                <CardBody>
                  <Badge tone="accent" className="mb-3">{p.badge}</Badge>
                  <CardTitle className="mb-2 group-hover:text-brand">{p.title}</CardTitle>
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">{p.summary}</p>
                  <div className="flex items-center justify-between text-xs text-ink-subtle">
                    <span>{p.date}</span>
                    <span className="text-brand font-semibold">{t('blogList.readMore')}</span>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-md border border-accent bg-hanji-dark p-6">
          <h3 className="font-bold text-brand text-lg mb-2">{t('blogList.ctaTitle')}</h3>
          <p className="text-ink-muted mb-3">{t('blogList.ctaText')}</p>
          <Link href={link('/countries')} className="text-accent font-semibold hover:underline">
            {t('blogList.ctaLink')}
          </Link>
        </div>
      </Section>
    </>
  );
}
