/**
 * Convert /content/source/*.docx into /content/ko/countries/<slug>.mdx
 * - Maps Korean country names to slugs from data/countries.ts
 * - Splits content into ## 개요 / ## 한국에서 먼저 / ## 현지에서 먼저
 *
 * Reference patterns: vercel/next.js MDX examples, contentlayer-lite.
 */
import fs from 'node:fs';
import path from 'node:path';
import mammoth from 'mammoth';
import { countries } from '../src/data/countries';

const SOURCE_DIR = path.join(process.cwd(), 'content', 'source');
const OUT_DIR = path.join(process.cwd(), 'content', 'ko', 'countries');

const koMap = new Map(countries.map(c => [c.name.ko, c]));

function slugifyFromFilename(fname: string): { slug: string; ko: string } | null {
  const base = fname.replace(/\.docx$/i, '');
  const m = base.match(/^([^_]+)_/);
  if (!m) return null;
  const ko = m[1];
  const c = koMap.get(ko);
  if (!c) return null;
  return { slug: c.slug, ko };
}

function splitSections(plain: string) {
  const lines = plain.split('\n').map(l => l.trim());
  const sections: { overview: string[]; ko: string[]; ab: string[] } = {
    overview: [],
    ko: [],
    ab: [],
  };
  let cur: 'overview' | 'ko' | 'ab' = 'overview';
  for (const l of lines) {
    if (/한국에서.*먼저/.test(l) || /한국에서 먼저 혼인신고/.test(l)) {
      cur = 'ko';
      continue;
    }
    if (/현지에서.*먼저/.test(l) || /현지 선/.test(l)) {
      cur = 'ab';
      continue;
    }
    sections[cur].push(l);
  }
  return sections;
}

function blocksToMarkdown(blocks: string[]) {
  return blocks
    .filter(l => l.length > 0)
    .map(l => {
      // 번호 항목 (1. , ① 등) → 그대로
      // 제목성 라인 (✅, 📋, [..]) → 굵게
      if (/^[✅📋✔■●]/.test(l)) return `**${l.replace(/^[✅📋✔■●]\s*/, '')}**`;
      if (/^\[.*\]$/.test(l)) return `**${l}**`;
      return l;
    })
    .join('\n\n');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('source not found:', SOURCE_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.docx'));
  console.log(`Found ${files.length} docx files`);

  const grouped = new Map<string, { ko: string; bodies: string[] }>();

  for (const file of files) {
    const meta = slugifyFromFilename(file);
    if (!meta) {
      console.warn(`skip (no slug): ${file}`);
      continue;
    }
    const buf = fs.readFileSync(path.join(SOURCE_DIR, file));
    const { value } = await mammoth.extractRawText({ buffer: buf });
    const entry = grouped.get(meta.slug) ?? { ko: meta.ko, bodies: [] };
    entry.bodies.push(value);
    grouped.set(meta.slug, entry);
  }

  let ok = 0, skipped = 0;
  for (const [slug, { ko, bodies }] of grouped) {
    const country = koMap.get(ko)!;
    const combined = bodies.join('\n\n');
    const sec = splitSections(combined);

    const lines: string[] = [];
    lines.push('---');
    lines.push(`country: "${ko}"`);
    lines.push(`countryEn: "${country.name.en}"`);
    lines.push(`slug: "${slug}"`);
    lines.push(`region: "${country.region}"`);
    lines.push(`flag: "${country.flag}"`);
    if (country.difficulty) lines.push(`difficulty: "${country.difficulty}"`);
    if (country.avgDays) lines.push(`avgDays: ${country.avgDays}`);
    lines.push(`updatedAt: "2025-04-25"`);
    lines.push(`summary: "${ko} 국적 배우자와의 F-6 결혼비자 신청 절차와 필요서류 안내."`);
    lines.push(`sourceCount: ${bodies.length}`);
    lines.push('---');
    lines.push('');
    lines.push('## 개요');
    lines.push('');
    lines.push(blocksToMarkdown(sec.overview));
    lines.push('');
    if (sec.ko.length) {
      lines.push('## 한국에서 먼저 혼인신고');
      lines.push('');
      lines.push(blocksToMarkdown(sec.ko));
      lines.push('');
    }
    if (sec.ab.length) {
      lines.push('## 현지에서 먼저 혼인신고');
      lines.push('');
      lines.push(blocksToMarkdown(sec.ab));
      lines.push('');
    }

    const mdx = lines.join('\n');
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.mdx`), mdx, 'utf-8');
    ok++;
  }
  console.log(`✅ ${ok} mdx written, ${skipped} skipped`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
