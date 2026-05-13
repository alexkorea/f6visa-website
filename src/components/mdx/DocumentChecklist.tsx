'use client';
import * as React from 'react';

interface Item { id: string; label: string }

export function DocumentChecklist({ storageKey, items }: { storageKey: string; items?: Item[] }) {
  const list = Array.isArray(items) ? items : [];
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, [storageKey]);
  if (!list.length) return null;
  const toggle = (id: string) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const done = list.filter(i => checked[i.id]).length;
  return (
    <div className="not-prose my-6 rounded-md border border-border bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-brand">서류 체크리스트</div>
        <div className="text-xs text-ink-muted">{done} / {list.length}</div>
      </div>
      <ul className="space-y-2">
        {list.map(it => (
          <li key={it.id}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 accent-brand" checked={!!checked[it.id]} onChange={() => toggle(it.id)} />
              <span className={checked[it.id] ? 'line-through text-ink-muted' : ''}>{it.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
