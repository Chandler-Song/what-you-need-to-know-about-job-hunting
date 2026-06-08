/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './**/*.vue',
    './**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          50:  '#f8f9fa',
          100: '#f0f2f5',
          200: '#e4e7ec',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#1a1e2e',
        },
        brand: {
          50:  '#eef2f7',
          100: '#dce4ef',
          200: '#b9c9df',
          300: '#7b9ec7',
          400: '#4a7ab0',
          500: '#2d5f94',
          600: '#1a365d',
          700: '#152c4d',
          800: '#0f2341',
          900: '#061222',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        sans:  ['"Noto Sans SC"', '"Source Han Sans SC"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        'reading': '80ch',
        'home':    '1152px',
      },
    },
  },
  plugins: [],
}
