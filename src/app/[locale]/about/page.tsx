import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/layout/Section';
import { Taegeuk, HanokEaves } from '@/components/ui/Taegeuk';
import { Button } from '@/components/ui/Button';
import { useMDXComponents } from '@/mdx-components';
import { getPageContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  return buildMetadata({ title: t('nav.about'), locale, path: '/about' });
}

const f6JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.f6visa.com/#org",
      name: "비전행정사사무소",
      alternateName: ["Vision Administrative Office", "飞展行政士事务所"],
      url: "https://www.f6visa.com",
      telephone: "+82-2-363-2251",
      email: "5000meter@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "퇴계로 324, 3층 성우빌딩",
        addressLocality: "Jung-gu",
        addressRegion: "Seoul",
        postalCode: "04614",
        addressCountry: "KR",
      },
      foundingDate: "2018",
      knowsLanguage: ["ko", "en", "zh", "ja"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.f6visa.com/#service",
      name: "비전행정사사무소 F-6 결혼비자 서비스",
      url: "https://www.f6visa.com",
      telephone: "+82-2-363-2251",
      address: {
        "@type": "PostalAddress",
        streetAddress: "퇴계로 324, 3층 성우빌딩",
        addressLocality: "Jung-gu",
        addressRegion: "Seoul",
        postalCode: "04614",
        addressCountry: "KR",
      },
      openingHours: "Mo-Fr 09:30-18:30",
      areaServed: { "@type": "Country", name: "South Korea" },
      availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
      serviceType: ["F-6 결혼비자", "F-6 비자 연장", "F-5 영주권 전환", "혼인 귀화"],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "F-6 결혼비자란 무엇인가요?", acceptedAnswer: { "@type": "Answer", text: "F-6 비자(결혼이민)는 한국인 배우자와 결혼한 외국인이 한국에 장기 체류할 수 있는 비자입니다. 혼인 성립 후 한국 외교공관에서 신청하거나, 이미 한국에 체류 중인 경우 출입국관리소에서 체류자격 변경 신청이 가능합니다." } },
        { "@type": "Question", name: "비전행정사사무소는 어떤 F-6 관련 업무를 대행하나요?", acceptedAnswer: { "@type": "Answer", text: "F-6 결혼비자 최초 발급, 체류 연장(2년 단위), 체류 자격 변경, F-2 장기거주로의 전환, F-5 영주권 전환, 귀화 신청 등 결혼이민과 관련된 모든 행정 업무를 대행합니다." } },
        { "@type": "Question", name: "비전행정사사무소는 법무법인인가요?", acceptedAnswer: { "@type": "Answer", text: "아닙니다. 행정사법에 따라 인가된 행정사사무소입니다. 행정서류 준비 및 관계 행정기관 제출을 대행합니다. 소송·재판·형사 변호 등 변호사 업무는 취급하지 않습니다." } },
        { "@type": "Question", name: "상담은 무료인가요?", acceptedAnswer: { "@type": "Answer", text: "네, 초기 상담은 무료입니다. 한국어, 영어, 중국어, 일본어로 상담이 가능합니다. KakaoTalk, WeChat, LINE, WhatsApp으로 메신저 상담도 제공합니다." } },
        { "@type": "Question", name: "F-6 비자 처리 기간은 얼마나 걸리나요?", acceptedAnswer: { "@type": "Answer", text: "해외 대사관 신청 시 통상 2~4주, 국내 출입국관리소 신청 시 1~3주입니다. 서류 준비 기간을 포함하면 전체 소요 기간은 1~2개월입니다. 개인 상황에 따라 다를 수 있습니다." } },
        { "@type": "Question", name: "어떤 언어로 상담이 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "한국어, 영어, 중국어(보통화), 일본어로 상담이 가능합니다. KakaoTalk, WeChat, LINE, WhatsApp을 통한 메신저 상담도 제공합니다. 전화: 02-363-2251 (평일 09:30~18:30)." } },
        { "@type": "Question", name: "F-6 비자 후 영주권(F-5) 취득이 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "네. F-6 비자로 2년 이상 한국에 거주하고 혼인 관계가 유지되면 F-5-9 영주권 신청이 가능합니다. 점수제 F-5-2도 조건 충족 시 신청할 수 있습니다. VISION 행정사사무소는 영주권 경로 상담 및 신청을 지원합니다." } },
      ],
    },
  ],
}

const f6Faqs = [
  { q: "F-6 결혼비자란 무엇인가요?", a: "F-6 비자(결혼이민)는 한국인 배우자와 결혼한 외국인이 한국에 장기 체류할 수 있는 비자입니다. 혼인 성립 후 한국 외교공관에서 신청하거나, 이미 한국에 체류 중인 경우 출입국관리소에서 체류자격 변경 신청이 가능합니다." },
  { q: "비전행정사사무소는 어떤 F-6 관련 업무를 대행하나요?", a: "F-6 결혼비자 최초 발급, 체류 연장(2년 단위), 체류 자격 변경, F-5 영주권 전환, 귀화 신청 등 결혼이민과 관련된 모든 행정 업무를 대행합니다." },
  { q: "법무법인인가요?", a: "아닙니다. 행정사법에 따라 인가된 행정사사무소입니다. 행정서류 준비 및 관계 행정기관 제출을 대행합니다. 소송·재판·형사 변호 등 변호사 업무는 취급하지 않습니다." },
  { q: "상담은 무료인가요?", a: "네, 초기 상담은 무료입니다. 한국어, 영어, 중국어, 일본어로 상담이 가능합니다. KakaoTalk, WeChat, LINE, WhatsApp으로 메신저 상담도 제공합니다." },
  { q: "F-6 비자 처리 기간은 얼마나 걸리나요?", a: "해외 대사관 신청 시 통상 2~4주, 국내 출입국관리소 신청 시 1~3주입니다. 서류 준비 기간을 포함하면 전체 소요 기간은 1~2개월입니다." },
  { q: "어떤 언어로 상담이 가능한가요?", a: "한국어, 영어, 중국어(보통화), 일본어로 상담이 가능합니다. KakaoTalk, WeChat, LINE, WhatsApp을 통한 메신저 상담도 제공합니다. 전화: 02-363-2251 (평일 09:30~18:30)." },
  { q: "F-6 비자 후 영주권(F-5) 취득이 가능한가요?", a: "F-6 비자로 2년 이상 한국에 거주하고 혼인 관계가 유지되면 F-5-9 영주권 신청이 가능합니다. 점수제 F-5-2도 조건 충족 시 신청할 수 있습니다." },
]

export default async function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale });
  const link = (p: string) => `/${locale}${p}`;
  const page = getPageContent('about', locale);
  if (!page) return null;
  const { content } = await compileMDX({
    source: page.body,
    components: useMDXComponents({}),
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(f6JsonLd) }} />
      <section className="relative bg-hanji border-b-2 border-brand-700 overflow-hidden">
        <div className="absolute -right-16 -bottom-12 opacity-10 pointer-events-none">
          <Taegeuk size={280} />
        </div>
        <Container className="py-12 md:py-16 relative">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="dancheong-band h-1 w-12 rounded-full" />
            <div className="text-xs font-bold tracking-widest text-accent uppercase">ABOUT</div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand">{page.data.title}</h1>
          {page.data.hero && (
            <p className="mt-4 text-lg text-ink-muted max-w-2xl leading-relaxed">{page.data.hero}</p>
          )}
        </Container>
        <HanokEaves color="#003478" height={10} />
      </section>

      <Section>
        {page.fellBack && (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 max-w-3xl">
            {t('translation.draftBanner')}
          </div>
        )}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 max-w-5xl">
          <article className="prose-f6 max-w-none">{content}</article>
          <aside className="space-y-4 self-start lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-white p-5">
              <div className="font-semibold text-brand mb-3">{t('cta.consult')}</div>
              <p className="text-sm text-ink-muted mb-4">{t('contact.subtitle')}</p>
              <Button href={link('/contact')} variant="default" className="w-full">
                {t('cta.consult')}
              </Button>
            </div>
          </aside>
        </div>
      </Section>
      <section className="py-16 bg-gray-50">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-black text-brand text-center mb-2">자주 묻는 질문</h2>
          <p className="text-center text-ink-muted text-sm mb-10">F-6 결혼비자 및 비전행정사사무소에 대한 자주 묻는 질문</p>
          <div className="space-y-3">
            {f6Faqs.map(({ q, a }, i) => (
              <details key={i} className="rounded-xl border border-border bg-white p-5">
                <summary className="font-semibold text-ink cursor-pointer list-none flex justify-between items-center text-sm">
                  {q}
                  <span className="text-brand ml-4 flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-ink-muted leading-relaxed text-sm">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
