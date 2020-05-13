var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IIterable` has one member `getIterator`.
 */
module[ExportInterface]({
  members: {
    GetIterator: Symbol.iterator
  }
})