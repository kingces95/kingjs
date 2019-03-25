var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IObservable` has a single member `subscribe`.
 */
module.exports = createInterface(
  '@kingjs/IObservable', {
    members: { subscribe: null },
  }
);