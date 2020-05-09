var {
  '@kingjs-interface': { define: defineInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IIterable` has one member `getIterator`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IIterable', {
    members: {
      getIterator: Symbol.iterator
    }
  }
)