/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        'full': '100%',
        '-full': '-100%',
      },
      keyframes: {
        falling: {
          '0%': { transform: 'translateY(-100px) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        }
      },
      animation: {
        'falling': 'falling 0.5s ease-out forwards',
      },
      fontFamily: {
        'sans': ["Open Sans", 'sans-serif'],
        'display': ["Bungee", 'sans-serif'],
        'code': ["Fira Code", 'monospace']
      }
    },
  }, plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'pastel',
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ],
  }
};
