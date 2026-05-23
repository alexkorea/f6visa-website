import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://f6visa.com";

const META: Record<string, { title: string; description: string; lang: string }> = {
  ko: {
    title: "F6Visa.com — 결혼비자(F-6) 전문 행정사사무소 | 비전행정사사무소",
    description: "한국 결혼비자(F-6) 신청부터 F-5 영주권 전환까지. 87개국 결혼 사례 데이터 기반 맞춤 상담. 한국어·영어·베트남어·태국어·러시아어 지원.",
    lang: "ko",
  },
  en: {
    title: "F6Visa.com — Korea Marriage Visa (F-6) Expert | Vision Admin Office",
    description: "Korea F-6 marriage visa application to F-5 permanent residency. Expert guidance based on 87-country case data. Korean, English, Vietnamese, Thai, Russian support.",
    lang: "en",
  },
  vi: {
    title: "F6Visa.com — Chuyên gia visa hôn nhân Hàn Quốc (F-6) | Vision",
    description: "Hỗ trợ xin visa kết hôn F-6 đến thường trú F-5. Tư vấn từ dữ liệu 87 quốc gia. Hỗ trợ tiếng Việt, Hàn, Anh, Thái, Nga.",
    lang: "vi",
  },
  th: {
    title: "F6Visa.com — ผู้เชี่ยวชาญวีซ่าแต่งงานเกาหลี (F-6) | Vision",
    description: "ยื่นวีซ่าสมรส F-6 ถึงถิ่นพำนักถาวร F-5 ปรึกษาจากข้อมูล 87 ประเทศ รองรับภาษาไทย เกาหลี อังกฤษ เวียดนาม รัสเซีย",
    lang: "th",
  },
  ru: {
    title: "F6Visa.com — Эксперт по брачной визе Кореи (F-6) | Vision",
    description: "Подача брачной визы F-6 и переход к постоянному проживанию F-5. Консультации на основе данных из 87 стран. Русский, корейский, английский, вьетнамский, тайский.",
    lang: "ru",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "비전행정사사무소 (Vision Administrative Office)",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "한국 결혼비자(F-6) 전문 행정사사무소. F-6-1/2/3 신청, F-5 영주권 전환 지원.",
  telephone: "+82-2-363-2251",
  address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: "Seoul" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "17:30",
  },
  areaServed: "KR",
  serviceType: ["F-6 Marriage Visa", "F-5 Permanent Residency", "Korean Immigration"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.ko;

  return {
    title: m.title,
    description: m.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
        vi: `${SITE_URL}/vi`,
        th: `${SITE_URL}/th`,
        ru: `${SITE_URL}/ru`,
        "x-default": `${SITE_URL}/ko`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "F6Visa.com",
      type: "website",
      locale: m.lang,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "F6Visa.com" }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
    robots: { index: true, follow: true },
  };
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}
