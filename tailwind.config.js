/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: {
      'display': ['"Sacramento"', 'sans-serif']
    }},
  }, plugins: [
    require('daisyui'),
  ], 
  daisyui: {
    themes: ["pastel"],
    theme:"pastel"
  }
};
