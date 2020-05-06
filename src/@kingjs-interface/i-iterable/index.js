var {
  '@kingjs': {
    '-reflect': { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IIterable` has one member `getIterator`.
 */
module.exports = createInterface(
  '@kingjs/IIterable', {
    members: {
      getIterator: Symbol.iterator
    }
  }
)