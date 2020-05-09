var {
  '@kingjs-interface': { 
    IObservable,
    define: defineInterface
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IPublishedObservable` extends `IObservable` and 
 * adds  a single new member `value`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IPublishedObservable', {
    members: { value: null },
    extends: IObservable
  }
)