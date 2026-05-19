import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-brand mb-4">404</h1>
      <p className="text-ink-muted mb-6">요청하신 블로그 포스트를 찾을 수 없습니다.</p>
      <Link href="/ko/blog" className="px-6 py-2 bg-brand text-white rounded-lg hover:opacity-90">
        블로그 목록으로
      </Link>
    </div>
  );
}
