const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: { qscreen: "90vh" },
      colors: { emerald: colors.emerald, gray: colors.gray, red: colors.red },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
