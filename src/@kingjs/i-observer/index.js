var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `subscribed`, 
 * `next`, `complete`, and `error`.
 */
module[ExportInterface]({
  members: {
    subscribed: null,
    next: null,
    complete: null,
    error: null
  },
})