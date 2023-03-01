/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1223px'},
      "pd": {'max': '1023px'},
      },
    extend: {},
  },
  plugins: [require("daisyui")],
}
