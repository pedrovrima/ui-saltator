const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: { emerald: colors.emerald, gray:colors.gray, red:colors.red },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
