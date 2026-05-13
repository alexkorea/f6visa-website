'use client';
import * as React from 'react';

export function FAQ({ items }: { items?: { q: string; a: React.ReactNode }[] }) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return null;
  return (
    <div className="not-prose my-6 divide-y divide-border rounded-md border border-border bg-white">
      {list.map((it, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer font-semibold flex items-center justify-between">
            {it.q}
            <span className="text-brand transition group-open:rotate-180">▾</span>
          </summary>
          <div className="mt-3 text-sm text-ink-muted leading-relaxed">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
