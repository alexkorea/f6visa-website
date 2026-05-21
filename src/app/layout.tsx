import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://f6visa.com'),
  title: {
    default: 'F-6 Marriage Visa Korea | 결혼비자 전문 — f6visa.com',
    template: '%s | f6visa.com'
  },
  description: 'F-6 marriage visa Korea — renewal, spouse visa, documents, and work permit guide. F-6 결혼비자 신청·갱신·서류 전문 행정사 컨설팅. Expert support in KO/EN/VI/TH/RU.',
  keywords: ['F-6 visa Korea', 'marriage visa Korea', 'spouse visa Korea', 'F6 visa renewal', '결혼비자', '결혼비자 갱신', '결혼비자 서류', 'F-6 결혼이민'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'F-6 Marriage Visa Korea | 결혼비자 전문 — f6visa.com',
    description: 'Expert F-6 marriage visa consulting in Korea. Renewal, documents, work permit. 결혼비자 신청·갱신 전문.',
    url: 'https://f6visa.com',
    siteName: 'f6visa.com',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
