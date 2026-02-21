/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0b1220',
          800: '#101b2d',
          700: '#152640',
          600: '#1b3556',
          500: '#21456d',
          400: '#316d8e',
          300: '#4a9bb4',
          200: '#7cc4d6',
          100: '#bfe2ea'
        },
        surface: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569'
        }
      },
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', '"Liberation Sans"', 'sans-serif'],
        body: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', '"Liberation Sans"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 40px -24px rgba(15, 23, 42, 0.45), 0 12px 20px -16px rgba(15, 23, 42, 0.25)',
        glow: '0 16px 36px -20px rgba(14, 116, 144, 0.45)'
      }
    }
  },
  plugins: []
};
