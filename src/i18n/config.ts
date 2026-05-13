export const locales = ['ko', 'vi', 'th', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';

export const localeLabels: Record<Locale, { label: string; flag: string; native: string }> = {
  ko: { label: 'Korean', flag: '🇰🇷', native: '한국어' },
  vi: { label: 'Vietnamese', flag: '🇻🇳', native: 'Tiếng Việt' },
  th: { label: 'Thai', flag: '🇹🇭', native: 'ภาษาไทย' },
  ru: { label: 'Russian', flag: '🇷🇺', native: 'Русский' },
  en: { label: 'English', flag: '🇬🇧', native: 'English' },
};
