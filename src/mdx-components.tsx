// Next.js MDX convention (vercel/next.js examples reference)
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/mdx/Callout';
import { Timeline } from '@/components/mdx/Timeline';
import { FAQ } from '@/components/mdx/FAQ';
import { DocumentChecklist } from '@/components/mdx/DocumentChecklist';
import { Tabs } from '@/components/mdx/Tabs';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    Timeline,
    FAQ,
    DocumentChecklist,
    Tabs,
    ...components,
  };
}
