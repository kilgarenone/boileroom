module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended",
    "stylelint-config-prettier",
    "stylelint-prettier/recommended"
  ],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        // Ignore CSS module's :global and :local pseudo classes
        ignorePseudoClasses: ["global", "local"]
      }
    ],
    // To allow :root before :global in index.scss
    "no-descending-specificity": null
  }
};
