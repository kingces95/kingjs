var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `initialize`, 
 * `next`, `complete`, and `error`.
 */
module[Export]({
  members: {
    initialize: null,
    next: null,
    complete: null,
    error: null
  },
})