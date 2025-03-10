const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const typography = require('@tailwindcss/typography');

/**
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.@(tsx|ts)',
    './src/containers/**/*.@(tsx|ts)',
    './src/layouts/**/*.@(tsx|ts)',
    './src/pages/**/*.tsx',
  ],
  plugins: [aspectRatio, forms, lineClamp, typography, require('tailwindcss-animate')],
  theme: {
    fontFamily: {
      sans: ['Open Sans'],
      display: ['Montserrat'],
    },
    fontSize: {
      xxs: [
        '0.5rem',
        {
          lineHeight: '0.75rem',
        },
      ],
      xs: [
        '0.6875rem',
        {
          lineHeight: '0.75rem',
        },
      ],
      sm: [
        '0.75rem',
        {
          lineHeight: '1rem',
        },
      ],
      base: [
        '0.875rem',
        {
          lineHeight: '1.1875rem',
        },
      ],
      lg: [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      xl: [
        '1.125rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      '2xl': [
        '1.5rem',
        {
          lineHeight: '2rem',
        },
      ],
      '2.5xl': [
        '2rem',
        {
          lineHeight: '2.5rem',
        },
      ],
      '3xl': [
        '2.5rem',
        {
          lineHeight: '3rem',
        },
      ],
      '4xl': [
        '3.25rem',
        {
          lineHeight: '3.25rem',
        },
      ],
      '5xl': [
        '4rem',
        {
          lineHeight: '4.25rem',
        },
      ],
      '6xl': [
        '5rem',
        {
          lineHeight: '5.625rem',
        },
      ],
    },
    extend: {
      colors: {
        green: {
          0: '#A3BC3B',
          20: '#B5C962',
          40: '#C8D789',
          60: '#DAE4B1',
          80: '#E3EBC4',
          100: '#EDF2D8',
        },
        yellow: {
          0: '#D8BE27',
          20: '#E0CB52',
          40: '#E8D87D',
          60: '#EFE5A9',
          80: '#F3ECBE',
          100: '#F7F2D4',
        },
        blue: {
          0: '#00548E',
          20: '#2570A5',
          40: '#498DBB',
          60: '#6EA9D2',
          80: '#92C6E8',
          100: '#B7E2FF',
        },
        grey: {
          0: '#1B1B1B',
          20: '#707070',
          40: '#CDCDCD',
          60: '#F8F8F8',
        },
        red: {
          0: '#CC503E',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      boxShadow: {
        select: '0px 2px 10px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
};
