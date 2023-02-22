/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      zIndex: {
        overlay: '1000',
        toolTip: '990',
        dialog: '980',
        dropdown: '970',
        sidebar: '800',
        iconsMenu: '880',
        sideBarMenu: '820',
        content: '700',
        topBar: '710',
        tableHeader: '700',
        tableHeaderResizer: '700',
      },
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        primary: {
          // DEAFULT: '#3B9391',
          50: '#f3faf9',
          100: '#d7f0ed',
          200: '#afe0db',
          300: '#7fc9c4',
          400: '#54adaa',
          500: '#3b9391',
          600: '#2d7474',
          700: '#275d5e',
          800: '#234b4c',
          900: '#213f40',
        },
        secondary: {
          DEAFULT: '#71AD43',
          50: '#F3F9EC',
          100: '#E3F1D6',
          200: '#CAE4B2',
          300: '#a8d284',
          400: '#88be5d',
          500: '#71ad43',
          600: '#51812f',
          700: '#406328',
          800: '#365024',
          900: '#2f4522',
        },
        tertiary: {
          DEAFULT: '#C8CD2D',
          50: '#f9fbeb',
          100: '#eef5cc',
          200: '#e0ec9c',
          300: '#d2e064',
          400: '#cbd639',
          500: '#c8cd2d',
          600: '#aba423',
          700: '#897b1f',
          800: '#726221',
          900: '#625221',
        },
        combos: {
          '1-light': '#7d6464',
          '1-dark': '#5f4b4b',

          '2-light': '#7d7a64',
          '2-dark': '#5f5d4b',

          '3-light': '#677d64',
          '3-dark': '#4c5f4b',

          '4-light': '#647d7a',
          '4-dark': '#4b5f5e',

          '5-light': '#64677d',
          '5-dark': '#4b505f',

          '6-light': '#79647d',
          '6-dark': '#5d4b5f',
        },
        tableStatusCol: {
          1: '#5f4b4b',
          2: '#5f5d4b',
          3: '#4c5f4b',
          4: '#4b5f5e',
          5: '#4b505f',
          6: '#5d4b5f',
        },
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [],
};