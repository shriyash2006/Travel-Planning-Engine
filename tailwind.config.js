/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#EE4336',
          darkred: '#D32F2F',
          accent: '#FF5C4D',
          dark: '#121212',
          carddark: '#1C1C1E',
          borderdark: '#2A2A2E',
          sand: '#F7F5F0',
          muted: '#737373'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        condensed: ['"Bebas Neue"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
