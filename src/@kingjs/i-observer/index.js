var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `next`, `complete`, and `error`.
 */
module[Export]({
  members: { 
    next: null,
    complete: null,
    error: null
  },
})