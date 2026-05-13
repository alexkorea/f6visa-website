import * as React from 'react';
import { cn } from '@/lib/cn';

type Tone = 'info' | 'warn' | 'tip' | 'danger';
const tones: Record<Tone, string> = {
  info: 'border-brand-200 bg-brand-50 text-brand-800',
  warn: 'border-amber-200 bg-amber-50 text-amber-900',
  tip: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  danger: 'border-red-200 bg-red-50 text-red-900',
};

export function Callout({ tone = 'info', title, children }: { tone?: Tone; title?: string; children: React.ReactNode }) {
  return (
    <div className={cn('not-prose my-5 rounded-md border-l-4 p-4', tones[tone])}>
      {title && <div className="font-bold mb-1">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
