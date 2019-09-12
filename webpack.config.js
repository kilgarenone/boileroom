const webpackMerge = require("webpack-merge");

const common = require("./config/webpack.common");

const envs = {
  development: process.env.LOCAL_BUILD ? "prod" : "dev",
  production: "prod"
};

const env = envs[process.env.NODE_ENV || "development"];
/* eslint-disable-next-line import/no-dynamic-require */
const envConfig = require(`./config/webpack.${env}`);

module.exports = webpackMerge(common, envConfig);
