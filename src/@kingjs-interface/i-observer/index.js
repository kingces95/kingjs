var {
  '@kingjs': {
    '-reflect': { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `next`, `complete`, and `error`.
 */
module.exports = createInterface(
  '@kingjs/rx.IObserver', {
    members: { 
      next: null,
      complete: null,
      error: null
    },
  }
);