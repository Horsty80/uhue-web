module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "uhue-gray": "#E3ECF4",
        "uhue-dark": "#0E1531",
        "uhue-indigo": "#6366f1",
        "uhue-indigo-pop": "#7416EC",
        "uhue-bluegreen": "#0F8094",
        "uhue-lightblue": "#00D9FE",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
