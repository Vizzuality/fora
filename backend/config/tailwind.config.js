const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/views/**/*',
    './app/helpers/**/*.rb',
    './config/initializers/simple_form_tailwind.rb',
    './app/javascript/**/*.js'
  ],
  plugins: [],
  theme: {
    fontFamily: {
      sans: ['Open\\ Sans', 'sans'],
      display: ['Montserrat', 'display'],
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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
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
        ...colors.red,
        0: '#CC503E',
      },
    },
  },
}
