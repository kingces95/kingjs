var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObserver` has a members `next`, `complete`, and `error`.
 */
module[ExportInterface]({
  members: { 
    next: null,
    complete: null,
    error: null
  },
})