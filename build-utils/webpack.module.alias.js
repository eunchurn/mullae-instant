const path = require("path");

const alias = {
  "react-dom": "@hot-loader/react-dom",
  "@components": path.resolve(__dirname, "../src/components"),
  "@winxp": path.resolve(__dirname, "../src/WinXP"),
  "@win95": path.resolve(__dirname, "../src/Win95"),
  "@postprocessing": path.resolve(
    __dirname,
    "../src/components/Intro/postprocessing",
  ),
  "@images": path.resolve(__dirname, "../src/assets/images"),
};

module.exports = alias;
