var {
  '@kingjs': { IObservable,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IPublishedObservable` extends `IObservable` and 
 * adds  a single new member `value`.
 */
module[ExportInterface]({
  members: { value: null },
  extends: [ IObservable ]
})