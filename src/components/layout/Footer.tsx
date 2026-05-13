import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const link = (path: string) => `/${locale}${path}`;
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <Container className="py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-bold text-brand text-lg mb-2">f6visa.com</div>
          <p className="text-sm text-ink-muted leading-relaxed">{t('footer.disclaimer')}</p>
        </div>
        <div>
          <div className="font-semibold text-brand mb-3">{t('nav.visa')}</div>
          <ul className="space-y-1.5 text-sm">
            <li><Link className="hover:text-brand" href={link('/visa/f-6-1')}>{t('nav.f61')}</Link></li>
            <li><Link className="hover:text-brand" href={link('/visa/f-6-2')}>{t('nav.f62')}</Link></li>
            <li><Link className="hover:text-brand" href={link('/visa/f-6-3')}>{t('nav.f63')}</Link></li>
            <li><Link className="hover:text-brand" href={link('/countries')}>{t('nav.countries')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-brand mb-3">{t('footer.office')}</div>
          <ul className="space-y-1.5 text-sm text-ink-muted">
            <li>대표 행정사: 이원중</li>
            <li>주소: 서울특별시 중구 퇴계로 324, 3층</li>
            <li>연락처: 02-363-2251</li>
            <li>이메일: 5000meter@gmail.com</li>
            <li>카카오톡: alexkorea</li>
          </ul>
          <ul className="flex gap-4 mt-4 text-xs text-ink-muted">
            <li><Link href={link('/privacy')} className="hover:text-brand">{t('footer.links.privacy')}</Link></li>
            <li><Link href={link('/terms')} className="hover:text-brand">{t('footer.links.terms')}</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border py-4 text-center text-xs text-ink-subtle">
        © {year} f6visa.com — {t('footer.rights')}
      </div>
    </footer>
  );
}
