const webpackMerge = require("webpack-merge");

const common = require("./config/webpack.common");

/* eslint-disable-next-line import/no-dynamic-require */
const envConfig = require(`./config/webpack.${process.env.NODE_ENV}`);

module.exports = webpackMerge(common, envConfig);
