import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CAFE_ROOT = '/Volumes/Home.mickey/f-6 서류/결혼비자자료';
const REGIONS = ['유럽_국가', '아시아_기타', '중남미_국가', '중동_국가', '아프리카_국가'];
const OUT = path.join(ROOT, 'content/ko/countries');

// Parse countries.ts to get slug ↔ ko mapping
const DATA = fs.readFileSync(path.join(ROOT, 'src/data/countries.ts'), 'utf8');
const re = /{ slug: '([^']+)',\s*iso2: '([^']+)',\s*flag: '([^']+)',\s*region: '([^']+)',\s*name: \{ ko: '([^']+)', vi: '[^']+', th: '[^']+', ru: '[^']+', en: '([^']+)' \},\s*difficulty: '([^']+)',\s*avgDays: (\d+) \}/g;
const COUNTRIES = [];
let m;
while ((m = re.exec(DATA))) {
  COUNTRIES.push({
    slug: m[1], iso2: m[2], flag: m[3], region: m[4],
    ko: m[5], en: m[6], difficulty: m[7], avgDays: +m[8],
  });
}

// Aliases (folder-name forms not directly equal to ko)
const ALIAS = {
  '영국인': '영국',
  '영국': '영국',
  '독일인': '독일',
  '독일': '독일',
  '프랑스': '프랑스',
  '이탈리아': '이탈리아',
  '스페인': '스페인',
  '노르웨이': '노르웨이',
  '스웨덴': '스웨덴',
  '벨기에': '벨기에',
  '오스트리아': '오스트리아',
  '크로아티아': '크로아티아',
  '네덜란드': '네덜란드',
  '스위스': '스위스',
  '그리스': '그리스',
  '체코': '체코',
  '호주': '호주',
  '뉴질랜드': '뉴질랜드',
  '벨라루스': '벨라루스',
  '아제르바이잔': '아제르바이잔',
  '투르크메니스탄': '투르크메니스탄',
  '캐나다': '캐나다',
  '우크라이나': '우크라이나',
  '덴마크': '덴마크',
  '헝가리': '헝가리',
  '폴란드': '폴란드',
  '포르투갈': '포르투갈',
  '터키': '터키',
  '터키(튀르키예)': '터키',
  '대만': '대만',
  '홍콩': '홍콩',
  '싱가포르': '싱가포르',
  '말레이시아': '말레이시아',
  '방글라데시': '방글라데시',
  '스리랑카': '스리랑카',
  '인도': '인도',
  '키르기스스탄': '키르기스스탄',
  '타지키스탄': '타지키스탄',
  '우르과이': '우루과이',
  '멕시코': '멕시코',
  '브라질': '브라질',
  '아르헨티나': '아르헨티나',
  '콜롬비아': '콜롬비아',
  '칠레': '칠레',
  '우루과이': '우루과이',
  '파라과이': '파라과이',
  '에콰도르': '에콰도르',
  '쿠바': '쿠바',
  '도미니카공화국': '도미니카공화국',
  '도미니카': '도미니카공화국',
  '베네수엘라': '베네수엘라',
  '코스타리카': '코스타리카',
  '페루': '페루',
  '과테말라': '과테말라',
  'UAE(아랍에미리트)': 'UAE',
  'UAE': 'UAE',
  '아랍에미리트': 'UAE',
  '이란': '이란',
  '사우디아라비아': '사우디아라비아',
  '사우디': '사우디아라비아',
  '쿠웨이트': '쿠웨이트',
  '이스라엘': '이스라엘',
  '이라크': '이라크',
  '시리아': '시리아',
  '오만': '오만',
  '예멘': '예멘',
  '요르단': '요르단',
  '카타르': '카타르',
  '튀니지': '튀니지',
  '가나': '가나',
  '세네갈': '세네갈',
  '콩고민주공화국': '콩고민주공화국',
  '콩고': '콩고민주공화국',
  '카메룬': '카메룬',
  '케냐': '케냐',
  '남아프리카공화국': '남아프리카공화국',
  '남아공': '남아프리카공화국',
  '나이지리아': '나이지리아',
  '모로코': '모로코',
  '이집트': '이집트',
  '알제리': '알제리',
};

// Build ko → country map
const koMap = new Map(COUNTRIES.map(c => [c.ko, c]));

// Sorted alias keys by length desc for greedy match
const aliasKeys = Object.keys(ALIAS).sort((a, b) => b.length - a.length);

function matchCountry(folderTitle) {
  // folderTitle: e.g. "영국인 배우자와 한국에서 먼저 혼인신고 절차 및 필요서류"
  for (const key of aliasKeys) {
    if (folderTitle.startsWith(key)) {
      const ko = ALIAS[key];
      const c = koMap.get(ko);
      if (c) return c;
    }
  }
  return null;
}

function readPost(postDir) {
  const txtPath = path.join(postDir, 'content.txt');
  if (!fs.existsSync(txtPath)) return null;
  const raw = fs.readFileSync(txtPath, 'utf-8');
  const subj = raw.match(/^제목: (.+)$/m);
  const subject = subj ? subj[1].trim() : path.basename(postDir).split('_').slice(1).join('_');
  const bodyStart = raw.indexOf('--- 본문 ---');
  const body = bodyStart >= 0 ? raw.slice(bodyStart + '--- 본문 ---'.length).trim() : raw;
  return { subject, body };
}

function cleanBody(text) {
  // Strip noise: trailing 카페·문의 lines, repeated blank lines, etc.
  let t = text
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // Drop lines that look like cafe footer cruft
  t = t
    .split('\n')
    .filter(line => {
      const s = line.trim();
      if (!s) return true;
      if (/^(좋아요|댓글|공유|스크랩|닉네임|작성자|등록일|조회수|첨부파일|이전 글|다음 글|목록)/.test(s)) return false;
      if (/네이버 카페|네이버카페|cafe\.naver\.com/.test(s)) return false;
      if (/^https?:\/\/\S+$/.test(s)) return false;
      return true;
    })
    .join('\n');
  return t;
}

function escapeMdx(text) {
  // MDX-safe: escape lone { and } characters (they trigger JSX expressions)
  return text.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

function buildMdx(country, posts) {
  const today = new Date().toISOString().slice(0, 10);
  const fm = [
    '---',
    `country: "${country.ko}"`,
    `countryEn: "${country.en}"`,
    `slug: "${country.slug}"`,
    `region: "${country.region}"`,
    `flag: "${country.flag}"`,
    `difficulty: "${country.difficulty}"`,
    `avgDays: ${country.avgDays}`,
    `updatedAt: "${today}"`,
    `summary: "${country.ko} 국적 배우자와의 F-6 결혼비자 신청 절차와 필요서류 안내."`,
    'status: "published"',
    '---',
    '',
  ].join('\n');

  // Categorize posts
  const koreaFirst = posts.find(p => /한국에서 먼저|한국에서 선/i.test(p.subject));
  const abroadFirst = posts.find(p => p !== koreaFirst && /현지에서 먼저|현지에서 선|현지 혼인신고|현지에서 혼인/i.test(p.subject));
  const general = posts.find(p => p !== koreaFirst && p !== abroadFirst);

  let body = `## 개요\n\n${country.ko} 국적 배우자와의 F-6 결혼비자 신청에 필요한 절차와 서류를 정리한 안내입니다. 비전행정사사무소가 운영하는 카페에 축적된 실무 자료를 기반으로 작성되었으며, 한국에서 먼저 혼인신고를 진행하는 방법과 ${country.ko} 현지에서 먼저 혼인신고를 진행하는 방법을 함께 비교해 확인하실 수 있습니다.\n\n`;

  if (general) {
    body += `## 종합 안내\n\n${escapeMdx(cleanBody(general.body))}\n\n`;
  }
  if (koreaFirst) {
    body += `## 한국에서 먼저 혼인신고\n\n${escapeMdx(cleanBody(koreaFirst.body))}\n\n`;
  }
  if (abroadFirst) {
    body += `## ${country.ko} 현지에서 먼저 혼인신고\n\n${escapeMdx(cleanBody(abroadFirst.body))}\n\n`;
  }

  body += `> 본 안내는 비전행정사사무소 카페의 실무 자료를 기반으로 작성되었으며, 영사관 운영 정책·서류 양식 변경에 따라 달라질 수 있습니다. 정확한 진행은 [상담 신청](/ko/contact)을 통해 안내받으시기 바랍니다.\n`;

  return fm + body;
}

const groups = new Map(); // slug -> {country, posts:[]}
const unmatched = [];

for (const region of REGIONS) {
  const regionDir = path.join(CAFE_ROOT, region);
  if (!fs.existsSync(regionDir)) continue;
  const posts = fs.readdirSync(regionDir).filter(d => fs.statSync(path.join(regionDir, d)).isDirectory());
  for (const folder of posts) {
    const norm = folder.normalize('NFC');
    const m = norm.match(/^\d+_(.+)$/);
    if (!m) { unmatched.push(`[${region}] ${folder} (no_id_prefix)`); continue; }
    const title = m[1];
    const country = matchCountry(title);
    if (!country) { unmatched.push(`[${region}] ${folder}`); continue; }
    const post = readPost(path.join(regionDir, folder));
    if (!post) { unmatched.push(`[${region}] ${folder} (no_content_txt)`); continue; }
    if (!groups.has(country.slug)) groups.set(country.slug, { country, posts: [] });
    groups.get(country.slug).posts.push({ ...post, _folder: folder });
  }
}

// Skip slugs that already have rich content (existing 16 mature ones)
// We'll only OVERWRITE files that look like our placeholders (status: "draft")
let written = 0;
let skipped = 0;
for (const [slug, { country, posts }] of groups) {
  const dst = path.join(OUT, `${slug}.mdx`);
  if (fs.existsSync(dst)) {
    const cur = fs.readFileSync(dst, 'utf8');
    if (cur.includes('status: "draft"')) {
      fs.writeFileSync(dst, buildMdx(country, posts));
      written++;
    } else {
      skipped++;
    }
  } else {
    fs.writeFileSync(dst, buildMdx(country, posts));
    written++;
  }
}

console.log(`Wrote: ${written}`);
console.log(`Skipped (existing rich): ${skipped}`);
console.log(`Unmatched folders: ${unmatched.length}`);
if (unmatched.length) {
  unmatched.slice(0, 20).forEach(u => console.log(' -', u));
}
