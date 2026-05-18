import createNextIntlPlugin from 'next-intl/plugin';
import nextMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Thai marriage visa duplicate
      { source: '/ko/blog/thai-marriage-visa-process', destination: '/ko/blog/thailand-f6-marriage-visa-guide', permanent: true },
      { source: '/en/blog/thai-marriage-visa-process', destination: '/en/blog/thailand-f6-marriage-visa-guide', permanent: true },
      { source: '/vi/blog/thai-marriage-visa-process', destination: '/vi/blog/thailand-f6-marriage-visa-guide', permanent: true },
      { source: '/th/blog/thai-marriage-visa-process', destination: '/th/blog/thailand-f6-marriage-visa-guide', permanent: true },
      { source: '/ru/blog/thai-marriage-visa-process', destination: '/ru/blog/thailand-f6-marriage-visa-guide', permanent: true },
      // Vietnam certificate duplicate (KO only)
      { source: '/ko/blog/vietnam-cert-marriage-eligibility', destination: '/ko/blog/vietnam-marriage-eligibility-certificate', permanent: true },
      // F-6 rejection duplicate
      { source: '/ko/blog/f6-rejected-causes', destination: '/ko/blog/marriage-visa-rejection-reapplication-strategy', permanent: true },
      { source: '/en/blog/f6-rejected-causes', destination: '/en/blog/marriage-visa-rejection-reapplication-strategy', permanent: true },
      { source: '/vi/blog/f6-rejected-causes', destination: '/vi/blog/marriage-visa-rejection-reapplication-strategy', permanent: true },
      { source: '/th/blog/f6-rejected-causes', destination: '/th/blog/marriage-visa-rejection-reapplication-strategy', permanent: true },
      { source: '/ru/blog/f6-rejected-causes', destination: '/ru/blog/marriage-visa-rejection-reapplication-strategy', permanent: true },
      // F-6 application process duplicate (KO only)
      { source: '/ko/blog/f6-marriage-visa-application-process-2026', destination: '/ko/blog/f6-marriage-visa-complete-guide-2026', permanent: true },
    ]
  },
};

export default withNextIntl(withMDX(nextConfig));
