/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      colors: {
        black: '#212529',
        white: '#F8F9FA',
        primary: {
          default: '#F27BA9',
          100: '#FCE5EE',
          200: '#FACADD',
          300: '#F7B0CB',
          400: '#F595BA',
          500: '#F27BA9',
          600: '#CE648D',
          700: '#AA4C71',
          800: '#873554',
          850: '#752946',
          900: '#631D38',
          950: '#51122A',
          dark: '#3F061C',
        },
        secondary: {
          default: '#7BE4F2',
          light: '#D9F6FB',
          dark: '#102629',
          100: '#D9F6FB',
          200: '#7BE4F2',
          300: '#63BAC6',
          400: '#4C929B',
          500: '#376B72',
          600: '#22474C',
          700: '#102629',
        },
        neutral: {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-sans)'],
        sans: [
          'var(--font-montserrat)',
          'var(--font-sans)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
};
