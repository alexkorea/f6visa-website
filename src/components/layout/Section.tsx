import * as React from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';

export function Section({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className={cn('py-14 md:py-20', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('mb-10', align === 'center' && 'text-center')}>
      {eyebrow && <div className="text-sm font-semibold text-accent-600 mb-1.5">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand">{title}</h2>
      {description && <p className="mt-3 text-ink-muted leading-relaxed max-w-2xl">{description}</p>}
    </div>
  );
}
