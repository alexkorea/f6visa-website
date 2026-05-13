import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'f6visa.com', template: '%s | f6visa.com' },
  description: 'F-6 결혼비자 전문 행정사 컨설팅',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
