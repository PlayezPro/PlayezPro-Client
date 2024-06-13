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
        'playez-dark': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#373737',
          '950': '#262626',
      },
        'playez': {
          '50': '#fffee4',
          '100': '#ffffc4',
          '200': '#fcff90',
          '300': '#f4ff50',
          '400': '#e7ff0c',
          '500': '#c9e600',
          '600': '#9cb800',
          '700': '#768b00',
          '800': '#5d6d07',
          '900': '#4e5c0b',
          '950': '#293400',
      },
      

      },
    },
  },
  plugins: [
    // require('tailwindcss-animated')
  ],
};
export const plugins = [
  require('tailwindcss-animated')
];
