module.exports = {
  root: true,
  parser: "babel-eslint", // Specifies the ESLint parser
  extends: [
    "plugin:jsx-a11y/recommended",
    "airbnb",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
    "prettier/react",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
  ],
  rules: {
     "no-unused-vars": [
      "error",
      { varsIgnorePattern: "^h$" }, // allow stuffs (prevState => ({})) and import h from 'preact'
    ],
  }
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
      },
    },
    react: {
      pragma: "h",
    },
  },
  globals: {
    NODE_ENV: true,
    API_BASE_URL: true,
  },
};
