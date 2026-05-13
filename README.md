# f6visa.com

F-6 결혼비자 전문 행정사 컨설팅 사이트.
Next.js 14 (App Router) + TypeScript + Tailwind + next-intl + MDX.

## 지원 언어
- 한국어 (`ko`, 기본)
- 베트남어 (`vi`)
- 태국어 (`th`)
- 러시아어 (`ru`)
- 영어 (`en`)

콘텐츠(MDX)는 한국어가 Source of Truth이며, 다른 언어 콘텐츠가 없으면 자동으로 한국어로 폴백합니다(상단에 자동 번역 배너 표시).

## 빠른 시작

```bash
# 1) 의존성 설치 (pnpm 권장)
pnpm install

# 2) 환경변수 설정
cp .env.example .env.local
# .env.local 편집: NEXT_PUBLIC_SITE_URL, RESEND_*, SLACK_WEBHOOK_URL 등

# 3) 개발 서버
pnpm dev
# http://localhost:3000 → /ko 로 자동 이동
```

## 87개국 콘텐츠 자동 변환

원본 docx 파일(국가별_정리/*.docx)을 `content/source/` 폴더에 복사한 뒤:

```bash
pnpm ingest
```

`content/ko/countries/<slug>.mdx` 파일이 자동 생성됩니다.

## 디렉터리 구조

```
src/
  app/
    [locale]/
      page.tsx                       # 홈
      visa/[slug]/page.tsx           # F-6-1/2/3 상세
      countries/page.tsx             # 국가 허브
      countries/[slug]/page.tsx      # 국가 상세
      contact/page.tsx               # 상담신청
      about, blog, privacy, terms
    api/contact/route.ts             # 폼 수신
    sitemap.ts, robots.ts
    layout.tsx, globals.css
  components/
    ui/         # Button, Card, Container, Badge
    layout/     # Header, Footer, Section, LanguageSwitcher
    mdx/        # Callout, Timeline, FAQ, DocumentChecklist, Tabs
  data/countries.ts                  # 87개국 메타(5개 언어 이름)
  i18n/config.ts, request.ts
  locales/{ko,vi,th,ru,en}.json
  lib/cn.ts, content.ts, seo.ts
  middleware.ts                      # next-intl locale 라우팅
  mdx-components.tsx                 # MDX 컴포넌트 매핑

content/
  ko/
    countries/<slug>.mdx             # 국가별 자료 (한국어 원본)
    visa/f-6-1.mdx, f-6-2.mdx, f-6-3.mdx
    blog/                            # 블로그 포스트
  source/                            # 원본 docx (커밋 제외 권장)
```

## 환경변수

| Key | 용도 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 절대 URL(canonical/sitemap/hreflang) |
| `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL` | 상담 신청 이메일 |
| `SLACK_WEBHOOK_URL` | 신규 상담 신청 Slack 알림 |
| `NEXT_PUBLIC_SUPABASE_URL`, `*_KEY` | (옵션) Supabase 저장 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | (옵션) 캡차 |
| `DEEPL_API_KEY` | (옵션) 자동 번역 파이프라인 |

API 라우트(/api/contact)는 환경변수가 비어 있을 때 콘솔에 폴백 로깅합니다.

## 배포

Vercel에 연결하고 환경변수만 설정하면 즉시 배포됩니다.
도메인 연결 후 Google Search Console에 5개 언어 속성을 등록하세요.

## 다국어 콘텐츠 추가 가이드

1. 한국어 MDX를 `content/ko/{section}/<slug>.mdx` 에 추가합니다.
2. 다른 언어로 번역하려면 `content/{vi|th|ru|en}/{section}/<slug>.mdx` 에 동일한 front-matter 구조로 작성합니다.
3. 미작성 언어는 자동으로 한국어로 폴백되며, 번역 배너가 표시됩니다.

## 라이선스

Private — © f6visa.com
