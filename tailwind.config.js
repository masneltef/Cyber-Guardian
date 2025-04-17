/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#4CAF50',
          'secondary': '#FFC107',
          'accent': '#9C27B0',
          'danger': '#F44336',
          'info': '#2196F3',
        },
        animation: {
          'slow-bounce': 'bounce 2s infinite',
        }
      },
    },
    plugins: [],
  }