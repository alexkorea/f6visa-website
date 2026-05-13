'use client';

import * as React from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';

interface CItem {
  slug: string;
  flag: string;
  region: string;
  name: string;
  difficulty?: string;
  avgDays?: number;
}

export function CountryGrid({
  locale,
  countries,
  regions,
  regionLabels,
  searchPlaceholder,
  allLabel,
  noResultLabel,
  difficultyLabels,
  daysSuffix,
}: {
  locale: string;
  countries: CItem[];
  regions: string[];
  regionLabels: Record<string, string>;
  searchPlaceholder: string;
  allLabel: string;
  noResultLabel: string;
  difficultyLabels: Record<string, string>;
  daysSuffix: string;
}) {
  const [region, setRegion] = React.useState<string>('all');
  const [query, setQuery] = React.useState('');

  const fuse = React.useMemo(
    () => new Fuse(countries, { keys: ['name', 'slug'], threshold: 0.35 }),
    [countries]
  );

  const filtered = React.useMemo(() => {
    let list = countries;
    if (region !== 'all') list = list.filter(c => c.region === region);
    if (query.trim()) {
      const slugSet = new Set(fuse.search(query).map(r => r.item.slug));
      list = list.filter(c => slugSet.has(c.slug));
    }
    return list;
  }, [countries, region, query, fuse]);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="h-11 w-full md:max-w-xs rounded-md border border-border px-3 bg-white"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setRegion('all')}
          className={cn('px-3 h-9 rounded-full text-sm font-medium border', region === 'all' ? 'bg-brand text-white border-brand' : 'bg-white border-border hover:bg-brand-50')}
        >{allLabel}</button>
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={cn('px-3 h-9 rounded-full text-sm font-medium border', region === r ? 'bg-brand text-white border-brand' : 'bg-white border-border hover:bg-brand-50')}
          >{regionLabels[r] ?? r}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ink-muted">{noResultLabel}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(c => (
            <Link key={c.slug} href={`/${locale}/countries/${c.slug}`} className="group">
              <div className="rounded-lg border border-border bg-white p-4 hover:border-brand transition h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="font-semibold text-ink group-hover:text-brand">{c.name}</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {c.difficulty && <Badge tone={c.difficulty === '상' ? 'danger' : c.difficulty === '중' ? 'accent' : 'success'}>{difficultyLabels[c.difficulty] ?? c.difficulty}</Badge>}
                  {c.avgDays && <span className="text-ink-muted">~{c.avgDays}{daysSuffix}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
