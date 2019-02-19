var {
  ['@kingjs']: {
    reflect: { createInterface },
    IEnumerable
  }
} = require('./dependencies');

/**
 * @description `IOrderedEnumerable` has a single member `createOrderedEnumerable`.
 */
module.exports = createInterface(
  '@kingjs/IOrderedEnumerable', {
    members: { createOrderedEnumerable: null },
    extends: [ IEnumerable ]
  }
);