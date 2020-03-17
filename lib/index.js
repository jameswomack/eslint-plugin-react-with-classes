'use strict';

const noUnusedClasses = require('./rules/no-unused-classes');

module.exports = {
  rules: {
    'no-unused-classes': noUnusedClasses,
  },

  configs: {
    recommended: {
      rules: {
        'react-with-styles/no-unused-classes': 'error',
        'no-restricted-imports': ['error', {
          paths: [{
            name: 'react-with-styles',
            importNames: ['css', 'cssNoRTL'],
            message: 'The global `css` and `cssNoRTL` exports are deprecated. Please use `this.props.css` instead!',
          }],
        }],
      },
    },
  },
};
