export interface BlogPostMeta {
  slug: string;
  badge: string;
  title: string;
  summary: string;
  date: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
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
    slug: 'thai-marriage-visa-process',
    badge: '국가별',
    title: '태국 결혼비자 신청 절차와 준비 서류 가이드',
    summary: '',
    date: '2026-04-27',
  },
  {
    slug: 'f6-philippines-spouse-visa-doc-checklist',
    badge: '국가별',
    title: '필리핀 배우자 F-6 결혼비자 서류 체크리스트 완벽 가이드',
    summary: '',
    date: '2026-04-25',
  },
  {
    slug: 'f6-rejected-causes',
    badge: '거절 사유',
    title: 'F-6 거절 사례 5가지와 재신청 전략',
    summary: '소득요건·가족관계등록·면접 응답 모순 등 출입국이 자주 보는 거절 사유를 사례 중심으로 정리합니다.',
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
    slug: 'vietnam-cert-marriage-eligibility',
    badge: '국가별',
    title: '베트남 혼인요건인증서 발급 절차 (서울·부산 영사관 차이)',
    summary: '주한베트남대사관과 부산 총영사관의 처리 일정·필요서류 비교, 속행 옵션 안내.',
    date: '2026-04-20',
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
];

export function findBlogPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
