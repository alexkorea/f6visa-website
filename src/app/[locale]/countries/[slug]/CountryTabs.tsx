'use client';
import * as React from 'react';
import { cn } from '@/lib/cn';

export function CountryTabs({
  koLabel, abLabel, koContent, abContent,
}: {
  koLabel: string; abLabel: string;
  koContent: React.ReactNode; abContent: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<'ko' | 'ab'>('ko');
  if (!koContent && !abContent) return null;
  return (
    <div className="not-prose">
      <div role="tablist" className="flex gap-1 border-b border-border">
        <button role="tab" onClick={() => setTab('ko')} aria-selected={tab === 'ko'} className={cn('px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px', tab === 'ko' ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-brand')}>{koLabel}</button>
        <button role="tab" onClick={() => setTab('ab')} aria-selected={tab === 'ab'} className={cn('px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px', tab === 'ab' ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-brand')}>{abLabel}</button>
      </div>
      <div className="pt-6">
        <div role="tabpanel" hidden={tab !== 'ko'} className="prose-f6 max-w-none">{koContent}</div>
        <div role="tabpanel" hidden={tab !== 'ab'} className="prose-f6 max-w-none">{abContent}</div>
      </div>
    </div>
  );
}
