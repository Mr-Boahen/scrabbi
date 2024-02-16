/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily:{
        splinesans:["Spline Sans"],
        signika:["signika"],
        narrow:["Archivo Narrow"],
        jetbrains:["JetBrains Mono"]
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, #8a2596, transparent)',
      },
      
    },
  },
  plugins: [],
}

