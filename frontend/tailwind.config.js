/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        smoke: '#f5f2ed',
        clay: '#b08a5f',
        charcoal: '#242424'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(17, 17, 17, 0.08)'
      }
    }
  },
  plugins: []
};
