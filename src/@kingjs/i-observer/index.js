var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `subscribed`, 
 * `next`, `complete`, and `error`.
 */
module[Export]({
  members: {
    subscribed: null,
    next: null,
    complete: null,
    error: null
  },
})