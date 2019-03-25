var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IObserver` has a members `next`, `current`, and `error`.
 */
module.exports = createInterface(
  '@kingjs/IObserver', {
    members: { 
      next: null,
      current: null,
      error: null
    },
  }
);