const { fontFamily } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        systemSans: [...fontFamily.sans]
      },
      colors: {
        primary: '#1E1E1E'
      },
      spacing: {
        '1.5': '6px',
      },
      maxWidth: {
        '8xl': '96rem'
      },
    },
    screens: {
      xsm: {'max': '639px'},
      ...defaultTheme.screens,
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
