import * as React from 'react';
import { cn } from '@/lib/cn';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'accent' | 'muted' | 'danger' | 'success';
}
export function Badge({ className, tone = 'default', ...props }: Props) {
  const tones = {
    default: 'bg-brand-50 text-brand',
    accent: 'bg-accent-50 text-accent-600',
    muted: 'bg-gray-100 text-gray-700',
    danger: 'bg-red-50 text-red-700',
    success: 'bg-green-50 text-green-700',
  } as const;
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', tones[tone], className)} {...props} />;
}
