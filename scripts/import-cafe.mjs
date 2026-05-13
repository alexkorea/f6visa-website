import fs from 'node:fs';
import path from 'node:path';

const CAFE_ROOT = '/Volumes/Home.mickey/f-6 서류/결혼비자자료';
const CONTENT_ROOT = path.join(process.cwd(), 'content', 'ko', 'countries');

// Countries to import (those WITHOUT existing rich MDX)
const COUNTRY_MAP = [
  { folder: '러시아',         slug: 'russia',       name: '러시아',         flag: '🇷🇺', region: '중앙아시아',   difficulty: '중', avgDays: 75 },
  { folder: '우즈베키스탄',   slug: 'uzbekistan',   name: '우즈베키스탄',   flag: '🇺🇿', region: '중앙아시아',   difficulty: '중', avgDays: 90 },
  { folder: '카자흐스탄',     slug: 'kazakhstan',   name: '카자흐스탄',     flag: '🇰🇿', region: '중앙아시아',   difficulty: '중', avgDays: 90 },
  { folder: '몽골',           slug: 'mongolia',     name: '몽골',           flag: '🇲🇳', region: '동북아시아',   difficulty: '중', avgDays: 75 },
  { folder: '캄보디아',       slug: 'cambodia',     name: '캄보디아',       flag: '🇰🇭', region: '동남아시아',   difficulty: '중', avgDays: 90 },
  { folder: '인도네시아',     slug: 'indonesia',    name: '인도네시아',     flag: '🇮🇩', region: '동남아시아',   difficulty: '중', avgDays: 90 },
  { folder: '미얀마',         slug: 'myanmar',      name: '미얀마',         flag: '🇲🇲', region: '동남아시아',   difficulty: '상', avgDays: 120 },
  { folder: '라오스',         slug: 'laos',         name: '라오스',         flag: '🇱🇦', region: '동남아시아',   difficulty: '중', avgDays: 90 },
  { folder: '네팔',           slug: 'nepal',        name: '네팔',           flag: '🇳🇵', region: '남아시아',     difficulty: '상', avgDays: 120 },
  { folder: '파키스탄',       slug: 'pakistan',     name: '파키스탄',       flag: '🇵🇰', region: '남아시아',     difficulty: '상', avgDays: 120 },
];

function readPostText(postDir) {
  const txtPath = path.join(postDir, 'content.txt');
  if (!fs.existsSync(txtPath)) return null;
  const raw = fs.readFileSync(txtPath, 'utf-8');
  // Extract subject + body
  const m = raw.match(/^제목: (.+)$/m);
  const subject = m ? m[1].trim() : path.basename(postDir).split('_').slice(1).join('_');
  const bodyStart = raw.indexOf('--- 본문 ---');
  const body = bodyStart >= 0 ? raw.slice(bodyStart + '--- 본문 ---'.length).trim() : raw;
  return { subject, body };
}

function buildMdx(country, posts) {
  const today = new Date().toISOString().slice(0, 10);
  const summary = `${country.name} 국적 배우자와의 F-6 결혼비자 신청 절차와 필요서류 안내.`;
  const frontmatter = [
    '---',
    `country: "${country.name}"`,
    `countryEn: "${country.slug.charAt(0).toUpperCase() + country.slug.slice(1)}"`,
    `slug: "${country.slug}"`,
    `region: "${country.region}"`,
    `flag: "${country.flag}"`,
    `difficulty: "${country.difficulty}"`,
    `avgDays: ${country.avgDays}`,
    `updatedAt: "${today}"`,
    `summary: "${summary}"`,
    '---',
    '',
  ].join('\n');

  let body = `## 개요\n\n${country.name} 국적 배우자와의 F-6 결혼비자 신청에 필요한 절차와 서류를 정리한 안내입니다. 아래 내용은 비전행정사 카페에 정리된 실무 자료를 바탕으로 작성되었으며, 한국 또는 ${country.name} 현지에서 먼저 혼인신고하는 방법을 비교해서 확인하실 수 있습니다.\n\n`;

  // Try to detect "한국에서 먼저" vs "현지에서 먼저" posts
  const koreaFirst = posts.find(p => /한국에서 먼저|한국에서 선|한국 선/i.test(p.subject));
  const abroadFirst = posts.find(p => /현지|현지에서 먼저|선 혼인신고|현지 선/i.test(p.subject) && p !== koreaFirst);
  const general = posts.find(p => !koreaFirst || (p !== koreaFirst && p !== abroadFirst));

  if (general) {
    body += `## 종합 안내\n\n${cleanPostBody(general.body)}\n\n`;
  }
  if (koreaFirst) {
    body += `## 한국에서 먼저 혼인신고\n\n${cleanPostBody(koreaFirst.body)}\n\n`;
  }
  if (abroadFirst) {
    body += `## 현지에서 먼저 혼인신고\n\n${cleanPostBody(abroadFirst.body)}\n\n`;
  }

  // Add any remaining posts as additional sections
  for (const p of posts) {
    if (p === general || p === koreaFirst || p === abroadFirst) continue;
    body += `## ${p.subject}\n\n${cleanPostBody(p.body)}\n\n`;
  }

  return frontmatter + body;
}

function cleanPostBody(body) {
  if (!body) return '';
  // Remove excessive blank lines
  let s = body.replace(/\n{4,}/g, '\n\n\n').trim();
  // Remove zero-width / non-content markers
  s = s.replace(/[​‌‍‎‏⁠﻿]/g, "");
  return s;
}

function main() {
  let created = 0;
  for (const c of COUNTRY_MAP) {
    const dir = path.join(CAFE_ROOT, c.folder);
    if (!fs.existsSync(dir)) {
      console.log(`SKIP ${c.folder}: folder missing`);
      continue;
    }
    const subdirs = fs.readdirSync(dir).filter(s => fs.statSync(path.join(dir, s)).isDirectory());
    const posts = subdirs.map(sub => readPostText(path.join(dir, sub))).filter(Boolean);
    if (!posts.length) {
      console.log(`SKIP ${c.folder}: no posts`);
      continue;
    }

    const mdx = buildMdx(c, posts);
    const out = path.join(CONTENT_ROOT, `${c.slug}.mdx`);
    fs.writeFileSync(out, mdx, 'utf-8');
    console.log(`✓ ${c.slug} <- ${posts.length} posts (${out.replace(process.cwd() + '/', '')})`);
    created++;
  }
  console.log(`\nTotal MDX created: ${created}`);
}

main();
