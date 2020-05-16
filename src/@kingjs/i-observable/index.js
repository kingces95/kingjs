var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IObservable` has a single member `subscribe`.
 */
module[Export]({
  members: { subscribe: null },
})