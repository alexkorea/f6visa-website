'use client';
import * as React from 'react';
import { cn } from '@/lib/cn';

interface Tab { id: string; label: string; content: React.ReactNode }

export function Tabs({ tabs, defaultTabId }: { tabs?: Tab[]; defaultTabId?: string }) {
  const list = Array.isArray(tabs) ? tabs : [];
  const [active, setActive] = React.useState(defaultTabId ?? list[0]?.id);
  if (!list.length) return null;
  return (
    <div className="not-prose my-6">
      <div role="tablist" className="flex gap-1 border-b border-border">
        {list.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition',
              active === t.id ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-brand'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-5">
        {list.map(t => (
          <div key={t.id} role="tabpanel" hidden={active !== t.id} className="prose-f6">
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
