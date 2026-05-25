import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { locales, type Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "비전행정사사무소",
  "alternateName": "Vision Administrative Office",
  "url": "https://f6visa.com",
  "description": "F-6 결혼비자 신청·갱신·이혼 후 비자·취업허가 전문 행정사 컨설팅. KO/EN/VI/TH/RU 지원.",
  "telephone": "+82-2-363-2251",
  "address": { "@type": "PostalAddress", "streetAddress": "퇴계로 324, 3층", "addressLocality": "중구", "addressRegion": "서울특별시", "postalCode": "04614", "addressCountry": "KR" },
  "openingHours": "Mo-Fr 09:30-17:30"
};
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VBQRGWT0RZ" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VBQRGWT0RZ');
          `}
        </Script>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
