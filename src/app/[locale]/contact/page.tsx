import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { ContactForm } from './ContactForm';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({
    title: t('contact.title'),
    description: t('contact.subtitle'),
    locale,
    path: '/contact',
  });
}

export default async function ContactPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });

  return (
    <>
      <section className="bg-brand-50 border-b border-border">
        <Container className="py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand">{t('contact.title')}</h1>
          <p className="mt-3 text-ink-muted">{t('contact.subtitle')}</p>
        </Container>
      </section>
      <Section>
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <ContactForm locale={locale} />
          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-2">{t('footer.office')}</div>
              <ul className="space-y-1 text-sm text-ink-muted">
                <li>{t('contact.office.rep')}: 이원중</li>
                <li>{t('contact.office.addressLabel')}: 서울특별시 중구 퇴계로 324, 3층 (성우빌딩)</li>
                <li>{t('contact.office.phoneLabel')}: 02-363-2251</li>
                <li>{t('contact.office.emailLabel')}: 5000meter@gmail.com</li>
                <li>{t('contact.office.hoursLabel')}: {t('contact.office.hoursValue')}</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
