var {
  '@kingjs-interface': { define: defineInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `next`, `complete`, and `error`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IObserver', {
    members: { 
      next: null,
      complete: null,
      error: null
    },
  }
)