var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      Except
    },
    IEnumerable,
  }
} = require('./dependencies');

/**
 * @description Generates a sequence composed of the 
 * distinct elements of another sequence.
 * 
 * @param {*} selectId 
 */
function distinct(selectId) {
  return this[Except](undefined, selectId);
};

exportExtension(module, IEnumerable, distinct);
