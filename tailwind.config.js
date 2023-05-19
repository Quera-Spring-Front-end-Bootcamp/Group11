/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#208D8E',
        black: '#000000',
        white: '#FFFFFF',
        gray: '#AAAAAA',
      },
      borderRadius: {
        20: '20px',
      },
      boxShadow: {
        mainCard: '0px 12px 50px rgba(0, 0, 0, 0.18);',
      },
      lineHeight: {
        21: '21px',
        22: '22px',
        24: '24px',
        50: '50px',
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        32: '32px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
