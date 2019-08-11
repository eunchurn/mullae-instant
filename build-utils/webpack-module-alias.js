const path = require("path");

const alias = {
  "react-dom": "@hot-loader/react-dom",
  "@components": path.resolve(__dirname, "../src/components"),
  "@postprocessing": path.resolve(
    __dirname,
    "../src/components/Main/postprocessing"
  ),
  "@images": path.resolve(__dirname, "../src/assets/images")
};

module.exports = alias;
