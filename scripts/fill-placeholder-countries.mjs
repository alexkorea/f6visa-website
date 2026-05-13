import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = fs.readFileSync(path.join(ROOT, 'src/data/countries.ts'), 'utf8');
const OUT = path.join(ROOT, 'content/ko/countries');

const re = /{ slug: '([^']+)',\s*iso2: '([^']+)',\s*flag: '([^']+)',\s*region: '([^']+)',\s*name: \{ ko: '([^']+)', vi: '([^']+)', th: '([^']+)', ru: '([^']+)', en: '([^']+)' \},\s*difficulty: '([^']+)',\s*avgDays: (\d+) \}/g;
const all = [];
let m;
while ((m = re.exec(DATA))) {
  all.push({
    slug: m[1], iso2: m[2], flag: m[3], region: m[4],
    ko: m[5], en: m[9], difficulty: m[10], avgDays: +m[11],
  });
}

const existing = new Set(
  fs.readdirSync(OUT).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
);
const missing = all.filter(c => !existing.has(c.slug));

const today = new Date().toISOString().slice(0, 10);

function buildMdx(c) {
  const fm = [
    '---',
    `country: "${c.ko}"`,
    `countryEn: "${c.en}"`,
    `slug: "${c.slug}"`,
    `region: "${c.region}"`,
    `flag: "${c.flag}"`,
    `difficulty: "${c.difficulty}"`,
    `avgDays: ${c.avgDays}`,
    `updatedAt: "${today}"`,
    `summary: "${c.ko} 국적 배우자와의 F-6 결혼비자 신청 절차와 필요서류 안내."`,
    'status: "draft"',
    '---',
    '',
  ].join('\n');

  const body = [
    '## 개요',
    '',
    `${c.ko} 국적 배우자와 한국 국민 사이의 혼인을 기반으로 한 F-6 결혼비자 신청 절차와 필요서류를 정리한 표준 안내입니다. 양국의 혼인신고 제도와 절차에 따라 한국에서 먼저 혼인신고를 진행하는 방법과 ${c.ko} 현지에서 먼저 혼인신고를 진행하는 방법 두 가지로 나누어 안내합니다.`,
    '',
    '<Callout type="info" title="국가별 상세 자료 작성 진행 중">',
    `${c.ko}에 특화된 영사관 위치, 서류 양식, 처리 기간 등 세부 정보는 추가 보강 작업이 진행되고 있습니다. 현재 페이지는 모든 국가에 공통적으로 적용되는 표준 절차 안내이며, 정확한 ${c.ko} 영사·등기 절차는 비전행정사사무소로 문의 주시기 바랍니다.`,
    '</Callout>',
    '',
    '## 한국에서 먼저 혼인신고',
    '',
    `한국 시·군·구청에 먼저 혼인신고를 한 후, 그 결과를 ${c.ko} 측에 보고하는 방식입니다. 한국 측 처리는 빠르나 ${c.ko}에서 별도 보고 절차가 추가됩니다.`,
    '',
    '<Timeline steps={[',
    `  { title: '${c.ko} 배우자의 혼인요건구비증명서 발급', desc: '${c.ko} 본국 관할 관청에서 발급, 아포스티유 또는 영사확인 + 한국어 번역공증.' },`,
    `  { title: '한국 시·군·구청에 혼인신고', desc: '한국인 배우자 신분증·가족관계증명서 + ${c.ko} 측 서류 제출.' },`,
    `  { title: '주한 ${c.ko} 대사관에 혼인 보고', desc: '한국 혼인관계증명서 + ${c.ko} 측 양식 제출.' },`,
    "  { title: 'F-6 사증 발급 신청', desc: '한국에 거주하는 한국인 배우자가 출입국·외국인청에 사증발급인정서 신청 또는 외국에서 직접 사증 신청.' },",
    "  { title: '한국 입국 후 외국인등록', desc: '입국일로부터 90일 이내 거주지 관할 출입국·외국인청 방문.' },",
    ']} />',
    '',
    '## 현지에서 먼저 혼인신고',
    '',
    `${c.ko} 현지에서 먼저 혼인신고를 한 후 한국 측에 보고하는 방식입니다. ${c.ko} 절차에 익숙하거나 현지에서 결혼식·동거를 시작하는 경우 적합합니다.`,
    '',
    '<Timeline steps={[',
    `  { title: '주${c.ko} 한국 대사관에서 혼인요건구비증명서 발급', desc: '한국인 배우자 명의로 신청, 본국 가족관계증명서 등 첨부.' },`,
    `  { title: '${c.ko} 관할 관청에 혼인신고', desc: '${c.ko} 측 절차에 따라 진행, 혼인증서 발급.' },`,
    "  { title: '주재국 한국 대사관에 보고적 혼인신고', desc: '발급된 혼인증서·번역공증본 첨부 제출.' },",
    "  { title: 'F-6 사증 발급 신청', desc: '주재국 한국 대사관 또는 한국 출입국·외국인청을 통해 신청.' },",
    "  { title: '한국 입국 후 외국인등록' },",
    ']} />',
    '',
    '## 자주 묻는 질문',
    '',
    '<FAQ items={[',
    "  { q: '처리 기간은 얼마나 걸리나요?',",
    `    a: '${c.ko}의 평균 처리 기간은 약 ${c.avgDays}일 내외이며, 서류 준비·번역공증·심사 일정에 따라 달라질 수 있습니다.' },`,
    "  { q: '아포스티유와 영사확인 중 어느 것이 필요한가요?',",
    `    a: '${c.ko}이 헤이그 아포스티유 협약 가입국이라면 아포스티유, 미가입국이라면 영사확인 절차를 거쳐야 합니다. 비전행정사사무소에서 국가별 정확한 방식을 확인해 드립니다.' },`,
    "  { q: '한국어 번역공증은 어디서 받나요?',",
    "    a: '국내 공증인가 법무법인 또는 공증사무소에서 받을 수 있으며, 사무소를 통해 일괄 대행 가능합니다.' },",
    ']} />',
    '',
    '> 본 페이지는 표준 절차 기반 안내이며, 실제 절차는 영사관 운영 정책·서류 양식 변경에 따라 달라질 수 있습니다. 정확한 진행은 [상담 신청](/ko/contact)을 통해 안내받으시기 바랍니다.',
    '',
  ].join('\n');

  return fm + body;
}

let written = 0;
for (const c of missing) {
  const dst = path.join(OUT, `${c.slug}.mdx`);
  fs.writeFileSync(dst, buildMdx(c));
  written++;
}
console.log(`Wrote ${written} placeholder MDX files (out of ${missing.length} missing).`);
