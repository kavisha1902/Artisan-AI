/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#4CAF50',
          'green-light': '#66BB6A',
        },
        secondary: {
          terracotta: '#E07856',
          beige: '#F5E6D3',
          mustard: '#F4A261',
        },
        accent: {
          coral: '#FF6B6B',
          skyblue: '#4ECDC4',
        },
        background: '#FAFAFA',
        text: '#2C3E50',
      },
      fontFamily: {
        heading: ['Poppins', 'Quicksand', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
