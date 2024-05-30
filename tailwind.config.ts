import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accentBlue: '#89C0FF',
        accentLightBlue: '#AED4FF',
        bgLightBlue: '#C4DFFF',
        brandBlue: '#0075FF',
        accentGray: '#898888',
        accentGray2: '#9A9A9A',
        bgGray: '#F2F2F2',
        accentGold: '#FFC107',
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
