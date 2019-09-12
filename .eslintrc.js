module.exports = {
  parser: "babel-eslint", // Specifies the ESLint parser
  extends: [
    "airbnb-base",
    "airbnb/rules/react",
    "plugin:eslint-comments/recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
    "prettier/react"
  ],
  rules: {
    "react/jsx-props-no-spreading": "off", // so we can use {...props}
    "react/state-in-constructor": "off", // if only state in constructor, then do it as class property, otherwise, do it in constructor
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-return-assign": "off", // so we can do (e) => ({})
    "react/prop-types": "off", // we don't do the .propTypes thing
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^prevState|^store", varsIgnorePattern: "^h$" } // allow stuffs (prevState => ({})) and import h from 'preact'
    ],
    "react/no-unused-state": "off", // in preact, we don't need to do this.state.name :)
    "no-empty-pattern": "off", // so we can do render({}, {haha}) {}
    camelcase: "off", // to accept server's keys
    "react/destructuring-assignment": "off", // so we can access this.props in a one-off instance
    "no-restricted-syntax": "off", // so we can use dangerouslyPasteHtml
    "global-require": "off", // so we can require() anywhere inside webpack config files
    "react/no-unescaped-entities": "off", // so we can simply type characters like apostrophe
    "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }], // allows haha && wow() syntax
    "react/style-prop-object": "off", // we can do style="color: black" as preact allows it :)
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }], // allows ++ in for(i, i<1, i++)
    "no-param-reassign": "off", // so we can do param = 'random' that's from function(param) {}
    "import/no-cycle": "off", // something to do with circular dependency imports. not sure.
    "prefer-promise-reject-errors": "off", // so we no need to do 'new Error()' in Promise.reject()
    "no-underscore-dangle": ["error", { allow: ["_throw"] }], // we gonna allow _throw()
    "consistent-return": "off", // not all function need to return something. not sure.
    "react/no-unknown-property": [
      "error",
      { ignore: ["stroke-width", "stroke-linecap", "stroke-linejoin", "class"] } // don't auto format these attrs
    ]
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    react: {
      pragma: "h"
    }
  },
  globals: {
    Promise: true,
    NODE_ENV: true
  }
};
