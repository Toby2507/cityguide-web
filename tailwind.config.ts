import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brandBlue: '#0075FF',
        accentBlue: '#89C0FF',
        accentLightBlue: '#AED4FF',
        accentGold: '#FFC107',
        accentGray: '#898888',
        accentGray2: '#9A9A9A',
      },
      flexBasis: {
        'card-3': 'calc((100% / 3) - (40 / 3))px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#0075FF',
            },
            secondary: '#AED4FF',
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#0075FF',
            },
            secondary: '#AED4FF',
          },
        },
      },
    }),
  ],
};
export default config;
