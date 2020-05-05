var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    linq: {
      Aggregate
    },
    IEnumerable,
  }
} = require('./dependencies');

/**
 * @description Computes the sum of a sequence of 
 * numbers projected from elements of a sequence.
 */
function sum() {
  return this[Aggregate](0, function(x) { 
    return this + x; 
  });
};

exportExtension(module, IEnumerable, sum);
