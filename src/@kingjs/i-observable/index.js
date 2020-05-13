var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObservable` has a single member `subscribe`.
 */
module[ExportInterface]({
  members: { Subscribe: null },
})