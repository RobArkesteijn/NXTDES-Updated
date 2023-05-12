/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          '400': '#359ABF95',
          '500': '#4394B1',
        },
      },
      fontFamily: {
        'logo': 'Fredericka the Great, cursive',
        'headers': 'Amatic SC, cursive',
        'text': 'Lato, sans-serif'
      },
      height: {
        '1/10': '10vh',
        '2/10': '20vh',
        '3/10': '30vh',
        '4/10': '40vh',
        '5/10': '50vh',
        '6/10': '60vh',
        '7/10': '70vh',
        '8/10': '80vh',
        '9/10': '90vh',
        '68': '17rem',
        '104': '26rem'
      },
      minHeight: {
        '8/10': '80%'
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}

