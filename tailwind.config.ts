import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(to right, #007991, #78FFD6)',
        'main-bg': 'url("/images/bg-gradient.png")',
      },
      colors: {
        accentBlue: '#89C0FF',
        accentLightBlue: '#AED4FF',
        accentRed: '#E42424',
        bgLightRed: '#f0d6d6',
        bgAccentBlue: '#F0F7FF',
        bgLightBlue: '#C4DFFF',
        brandBlue: '#000428',
        brandBlueAccent: '#004E92',
        accentGray: '#898888',
        accentGray2: '#9A9A9A',
        bgGray: '#E5F0FD',
        blue500: '#0075FF',
        gray100: '#F2F2F2',
        gray150: '#F5F7FA',
        green250: '#78FFD6',
        green400: '#007991',
        accentGold: '#FFC107',
        accentYellow: '#FFE187',
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
      layout: {
        fontSize: {
          large: '3rem',
        },
        lineHeight: {
          large: '3.5rem',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#000428',
            },
            secondary: '#1A85FF',
          },
        },
        dark: {
          colors: {
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#000428',
            },
            secondary: '#1A85FF',
          },
        },
      },
    }),
  ],
};
export default config;
