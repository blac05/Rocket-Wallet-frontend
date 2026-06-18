/** @type {import('postcss').Container} */
module.exports = {
  plugins: [
    require('tailwindcss'), // Tailwind CSS core
    require('@tailwindcss/postcss'), // Correct plugin for Tailwind with PostCSS
    require('autoprefixer'),
  ],
};