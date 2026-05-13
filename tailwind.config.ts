import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // 태극기 dark blue (정청)
        brand: {
          DEFAULT: '#003478',
          50: '#EAF0FA',
          100: '#CDDAEF',
          200: '#9AB5DE',
          300: '#5E85C5',
          400: '#2A5AA8',
          500: '#0E4593',
          600: '#003478',
          700: '#002A60',
          800: '#001E48',
          900: '#001530',
        },
        // 태극기 red (홍색)
        accent: {
          DEFAULT: '#C60C30',
          50: '#FCEAEE',
          100: '#F6CBD3',
          200: '#EE96A4',
          300: '#E36174',
          400: '#D6314A',
          500: '#C60C30',
          600: '#A30A28',
          700: '#7E081F',
        },
        // 단청 - 황·녹·자색 보조
        dancheong: {
          gold: '#C9A340',     // 황
          green: '#1F6C3D',    // 녹청
          ochre: '#9A4A1F',    // 적토
          jade: '#2E7D7D',     // 청록
        },
        // 한지 색상 (ivory beige)
        hanji: {
          DEFAULT: '#FBF7E8',
          dark: '#F2EAD0',
          deeper: '#E2D5A8',
        },
        ink: {
          DEFAULT: '#1A1A1A',     // 먹
          muted: '#4B4B4B',
          subtle: '#8B8B8B',
        },
        surface: '#FFFFFF',
        bg: '#FBF7E8',          // 한지 본문 배경
        border: '#E0D8B8',      // 한지 톤 보더
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '72rem',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '6px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
