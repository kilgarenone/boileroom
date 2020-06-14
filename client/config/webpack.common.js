const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const settings = require("./webpack.settings");

let envFileName = "";

if (process.env.TEST_RUN || process.env.NODE_ENV === "development") {
  envFileName = ".development";
}
// Understanding the path.resolve traversing.
// Path.resolve build absolute path from right to left arguments,
// starting from the current directory where its run, in this case of 'webpack.common.js',
// it starts from ROOT/config/webpack
module.exports = {
  entry: {
    app: settings.entryPath,
    // TODO: Add more entries whose files rarely change
  },
  module: {
    rules: [
      // FONT loader
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${settings.fontsFolder}/[name].[hash].[ext]`, // output to /fonts folder under output.path
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `${settings.envPath}${envFileName}`,
    }),
    new ProgressBarPlugin(),
  ],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js"],
  },
};
