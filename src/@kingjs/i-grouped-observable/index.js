var {
  '@kingjs': { IObservable,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedObservable` extends `IObservable` and 
 * adds  a single new member `key`.
 */
module[Export]({
  members: { key: null },
  bases: [ IObservable ]
})