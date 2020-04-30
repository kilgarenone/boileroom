// REFERENCE
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

module.exports = {
  SQL_PASSWORD: process.env.SQL_PASSWORD,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
};
