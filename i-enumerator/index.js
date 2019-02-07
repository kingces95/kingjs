var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IEnumerator` has members `current` and `moveNext`.
 */
module.exports = createInterface(
  '@kingjs/IEnumerator', {
    members: { 
      moveNext: null,
      current: null,
    },
  }
);