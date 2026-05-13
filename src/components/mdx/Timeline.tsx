import * as React from 'react';

export function Timeline({ steps }: { steps?: { title: string; desc?: string }[] }) {
  const list = Array.isArray(steps) ? steps : [];
  if (!list.length) return null;
  return (
    <ol className="not-prose my-6 space-y-4">
      {list.map((s, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex-none w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">{i + 1}</div>
          <div>
            <div className="font-semibold text-brand">{s.title}</div>
            {s.desc && <div className="text-sm text-ink-muted leading-relaxed mt-0.5">{s.desc}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
