var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IIterable` has one member `getIterator`.
 */
module[Export]({
  members: {
    getIterator: Symbol.iterator
  }
})