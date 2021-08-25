const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/*.{js,tsx}","./src/components/*.{js,tsx}","./src/components/decks/*.{js,tsx}","./src/components/end/*.{js,tsx}","./src/components/game/*.{js,tsx}","./src/components/spp_list/*.{js,tsx}"],
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
