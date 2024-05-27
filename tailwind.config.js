module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'black': '#32332D',
        'base-dark': '#373737',
        'base-white': '#F2F2F2',
        'primary': '#E7FF0D',
        'secondary': '#BBBF39',
        'warning':'#757E95', //Acciones de eliminar o similar
        'alert':'#2FB8FF', //Confirmar acciones
        'success':'#BBBF39', //Exito
        'info':'#7F8493', 

      },
      // backgroundImage: theme => ({
      //   'gradient-to-dark': 'linear-gradient(to bottom, #2A2D32, #131313)',
      // }),
    },
  },
  plugins: [
    // require('tailwindcss-animated')
  ],
};
export const plugins = [
  require('tailwindcss-animated')
];
