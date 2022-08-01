/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      boxShadow:{
        custome:'25px 25px 75px rgba(20, 83, 45, .25), 10px 10px 70px rgba(20, 83, 45, .25), inset -5px -5px 15px rgba(20, 83, 45, .5)',
        button:'inset -8px 0px 8px rgba(20, 83, 45, .15), inset 0px -8px 8px rgba(20, 83, 45, .15), 0px 0px 0px 0px rgba(20, 83, 45, .75), 10px 20px 25px rgba(20, 83, 45, .4)',
        output:'0px 0px 5px rgba(20, 83, 45, .75)',
        beforeButton:'-5px -5px 15px rgba(20, 83, 45, .1), 10px 5px 10px rgba(20, 83, 45, 0.15)'
      },
      gridTemplateColumns:{
        4: 'repeat(4, minmax(0, 76px))',
      },
      gridTemplateRows:{
        5: 'minmax(80px, 1fr), repeat(5, 74px)'
      },
      backgroundImage:{
        gradient: 'linear-gradient(180deg,#86efac, #86efac)',
        button: 'linear-gradient(90deg,#86efac, #86efac)',
      }
    },
  },
  plugins: [],
}
