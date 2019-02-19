var { 
  ['@kingjs']: {
    assertShimmed,
    reflect: { 
      exportExtension
    },
    linq: {
      Concat
    },
    IEnumerable,
  }
} = require('./dependencies');

/**
 * @description Generates an sequence identical to another 
 * sequence but with a value added to the start.
 * 
 * @param {*} value 
 */
function prepend(value) {
  return [value][Concat](this);
};

exportExtension(module, IEnumerable, prepend);
