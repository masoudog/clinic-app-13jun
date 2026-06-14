import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Accent (primary action color)
        accent: '#203AA2',
        'accent-soft': '#E9EBF6',

        // Pastel palette (for user/therapist color-coding)
        sky: '#A8C5DA',
        'sky-soft': '#DCE8F0',
        sage: '#B8D4C2',
        'sage-soft': '#DEEBE2',
        beige: '#E8DCC4',
        'beige-soft': '#F2EBDB',
        lavender: '#C9BBD9',
        'lavender-soft': '#E5DDED',
        rose: '#E8C4C4',
        'rose-soft': '#F2DCDC',

        // Neutral palette
        bg: '#F4F5F7',
        'bg-elevated': '#FFFFFF',
        'bg-soft': '#ECEEF2',
        ink: '#2C3138',
        'ink-soft': '#4B535F',
        'ink-muted': '#6A7686',
        line: '#E2E4EA',
        'line-soft': '#EEF0F4',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '32px': '32px',
        '20px': '20px',
        '28px': '28px',
      },
      borderRadius: {
        'sm': '10px',
        'md': '16px',
        'lg': '22px',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(16, 24, 52, 0.04)',
        'md': '0 2px 8px rgba(16, 24, 52, 0.05), 0 1px 2px rgba(16, 24, 52, 0.04)',
        'lg': '0 12px 40px rgba(16, 24, 52, 0.10), 0 2px 8px rgba(16, 24, 52, 0.05)',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Estedad', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '13px',
        sm: '14px',
        base: '15px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};

export default config;
