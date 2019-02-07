var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
module.exports = createInterface(
  '@kingjs/IEnumerable', {
    members: { getEnumerator: null },
  }
);