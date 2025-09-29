/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff', 100: '#d9eaff', 200: '#b9d7ff', 300: '#8ebdff',
          400: '#5f9bff', 500: '#2e74b5', 600: '#255b8f', 700: '#1d476f',
          800: '#163655', 900: '#10283f'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.08)'
      }
    }
  },
  plugins: [],
};

