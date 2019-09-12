const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../dist"),
  srcPath: path.resolve(__dirname, "../src"),
  entryPath: path.resolve(__dirname, "../src/index.jsx"),
  templatePath: path.resolve(__dirname, "../src/index.html"),
  envPath: path.resolve(__dirname, "../.env."),
  jsFolder: "js",
  imagesFolder: "img",
  fontsFolder: "fonts",
  babelLoaderConfig: {
    exclude: [/(node_modules|bower_components)/]
  }
  // cssFolder: "css",
};
