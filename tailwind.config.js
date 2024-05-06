/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: {
      'display': ['"Concert One"', 'sans-serif']
    }},
  }, plugins: [
    require('daisyui'),
  ], 
  daisyui: {
    themes: true
  }
};
