var {
  '@kingjs-interface': { define: defineInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObservable` has a single member `subscribe`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IObservable', {
    members: { subscribe: null },
  }
)