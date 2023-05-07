/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          '500': '#4394B1',
        },
      },
      fontFamily: {
        'logo': 'Fredericka the Great, cursive',
        'headers': 'Amatic SC, cursive',
        'text': 'Lato, sans-serif'
      },
      height: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
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

