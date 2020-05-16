var {
  '@kingjs': { IObservable,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IPublishedObservable` extends `IObservable` and 
 * adds  a single new member `value`.
 */
module[Export]({
  members: { value: null },
  extends: [ IObservable ]
})