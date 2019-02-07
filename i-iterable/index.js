var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IIterable` has one member `getIterator`.
 */
module.exports = createInterface(
  '@kingjs/IIterable', {
    members: {
      getIterator: Symbol.iterator
    }
  }
)