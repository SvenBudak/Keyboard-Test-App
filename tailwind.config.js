/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'dividing-line': '0 0 0 1px #333438',
      },
    },
  },
  plugins: [],
};
