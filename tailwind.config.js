/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat-Regular", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
        "montserrat-light": ["Montserrat-Light", "sans-serif"],
        "montserrat-medium": ["Montserrat-Medium", "sans-serif"],
        "montserrat-semibold": ["Montserrat-SemiBold", "sans-serif"],
        "montserrat-extra-bold": ["Montserrat-ExtraBold", "sans-serif"],

        raleway: ["Raleway-Regular", "sans-serif"],
        "raleway-bold": ["Raleway-Bold", "sans-serif"],
        "raleway-light": ["Raleway-Light", "sans-serif"],
        "raleway-medium": ["Raleway-Medium", "sans-serif"],
        "raleway-semibold": ["Raleway-SemiBold", "sans-serif"],
        "raleway-extra-bold": ["Raleway-ExtraBold", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#108036", // ton vert principal
          200: "#A7E5BE", // très clair (vert pâle)
          300: "#5CCB89", // clair
          400: "#34A853", // medium vif (rapproché de #119e40)
          500: "#119E40", // vert foncé / accent fort
        },

        gray: {
          DEFAULT: "#FDFDFD",
          200: "#F3F3F3",
          300: "#B6B6B6",
          400: "#A8A8A9",
          500: "#676767",
        },
      },
    },
  },
  plugins: [],
};
