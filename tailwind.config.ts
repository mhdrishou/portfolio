import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        cardForeground: 'var(--card-foreground)',
        primary: {
          DEFAULT: '#5bc4f5',
          light: '#a8d8f0',
          dark: '#0e7cb5'
        },
        darkSpace: {
          100: '#0a0a0f',
          200: '#080808',
          300: '#050508'
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
