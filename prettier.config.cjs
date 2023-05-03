/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 100,
  arrowParens: "avoid",
};

module.exports = config;
