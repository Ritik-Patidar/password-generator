/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: '#808080',
          lighter: '#D9D9D9',
          light: '#2A2A2A',
          DEFAULT: '#2B2B2B',
          dark: '#001329',
        },
        br:{
          DEFAULT:'#355BC0'
        }
      },
    },
  },
  plugins: [],
}
