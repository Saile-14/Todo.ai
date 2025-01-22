/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        'light-purple': '#EDE7F6',
        'deep-purple': '#673AB7',
        'todo-red': '#FF5252',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
