var {
  '@kingjs-interface': {
    define: defineInterface,
    IObservable
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedObservable` extends `IObservable` and 
 * adds  a single new member `key`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IGroupedObservable', {
    members: { key: null },
    extends: IObservable
  }
)