export interface BlogPostMeta {
  slug: string;
  badge: string;
  title: string;
  summary: string;
  date: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'f6-visa-guarantor-income-requirement',
    badge: '소득요건',
    title: '결혼비자 보증인 활용 완전 가이드 — F-6 소득요건 부족 시 해결책',
    summary: 'F-6 결혼비자 소득요건이 부족한 경우 적격 보증인을 세우면 비자 신청이 가능하며, 자격 요건·제출 서류·신청 절차를 단계별로 안내합니다.',
    date: '2026-05-15',
  },
  {
    slug: 'mongolia-f6-marriage-visa-documents',
    badge: '국가별',
    title: '몽골 결혼비자 서류 준비 완벽 가이드 | F-6 신청부터 입국까지',
    summary: '몽골 배우자 F-6 결혼비자 신청에 필요한 서류 목록, 아포스티유 공증 방법, 신청 절차를 실무 경험 기반으로 상세히 안내합니다.',
    date: '2026-05-15',
  },
  {
    slug: 'uzbekistan-marriage-visa-f6',
    badge: '국가별',
    title: '우즈베키스탄 배우자 F-6 결혼비자 절차와 서류 완전 가이드',
    summary: '우즈베키스탄 국적 배우자와 결혼한 한국인을 위해 F-6 결혼비자 신청에 필요한 서류, 단계별 절차, 심사 기준을 행정사 실무 경험을 바탕으로 상세히 안내합니다.',
    date: '2026-05-14',
  },
  {
    slug: 'marriage-visa-rejection-reapplication-strategy',
    badge: '거절 사유',
    title: '결혼비자 거절 사유와 재신청 전략 — 전문 행정사가 알려드립니다',
    summary: '결혼비자(F-6) 거절 사유를 정확히 파악하고 보완하면 재신청으로 허가 가능성을 높일 수 있으며, 비전행정사사무소가 20개국 이상의 실무 경험으로 맞춤 전략을 제공합니다.',
    date: '2026-05-14',
  },
  {
    slug: 'f6-required-documents-2026',
    badge: '서류체크리스트',
    title: 'F-6 결혼비자 신청 서류 완벽 체크리스트 2026년',
    summary: 'F-6 결혼비자 신청에 필요한 서류를 국가별·상황별로 정리. 공통 서류, 국가별 추가 서류, 아포스티유 안내까지.',
    date: '2026-05-13',
  },
  {
    slug: 'f6-stay-period-extension-2026',
    badge: '체류기간',
    title: 'F-6 결혼비자 체류기간 갱신 방법 2026년 완벽 가이드',
    summary: 'F-6 결혼비자 체류기간 갱신 조건, 필요 서류, 갱신 절차를 2026년 최신 기준으로 안내. 갱신 거절 사유와 대처법 포함.',
    date: '2026-05-13',
  },
  {
    slug: 'f6-philippines-spouse-visa-doc-checklist',
    badge: '국가별',
    title: '필리핀 배우자 F-6 결혼비자 서류 체크리스트 완벽 가이드',
    summary: '',
    date: '2026-04-25',
  },
  {
    slug: 'income-requirement-2026',
    badge: '소득요건',
    title: '2026년 결혼비자 소득요건 총정리',
    summary: '연간 소득금액 산정 기준, 인정되지 않는 소득, 보증인 활용 가능성을 출입국 매뉴얼 기준으로 정리.',
    date: '2026-04-23',
  },
  {
    slug: 'china-affidavit-of-single',
    badge: '국가별',
    title: '중국 혼인등기 신청 시 미혼증명 공증 실무',
    summary: '한국 미혼증명 → 외교부 아포스티유 → 중국 영사인증의 단계별 소요시간과 비용.',
    date: '2026-04-18',
  },
  {
    slug: 'consulate-interview-tips',
    badge: '면접팁',
    title: '재외공관 영사 인터뷰, 자주 묻는 질문 12개',
    summary: '의사소통 능력 평가, 결혼 동기, 부부 일상 질문 — 응답 시 주의할 표현 예시.',
    date: '2026-04-15',
  },
  {
    slug: 'f6-to-f5-transition',
    badge: 'F-5 전환',
    title: 'F-6에서 F-5(영주)로 가는 길',
    summary: '결혼이민 영주 요건, 신청 시점, 점수표 산정 — 귀화와 비교 후 진로 결정 가이드.',
    date: '2026-04-12',
  },
  {
    slug: 'f6-marriage-visa-complete-guide-2026',
    badge: 'F-6 비자',
    title: 'F-6 결혼이민비자 완벽 가이드 2026: 신청 자격·서류·연장까지',
    summary: 'F-6 결혼이민비자 신청 자격·필요서류·소득 요건·심사 절차를 비전행정사사무소가 출입국 매뉴얼 기준으로 정리합니다. F-5 영주권 전환·국적 취득 경로까지.',
    date: '2026-05-07',
  },
];

export function findBlogPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
