var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IObserver` has a members `next`, `complete`, and `error`.
 */
module.exports = createInterface(
  '@kingjs/IObserver', {
    members: { 
      next: null,
      complete: null,
      error: null
    },
  }
);