var {
  '@kingjs': { IObservable,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedObservable` extends `IObservable` and 
 * adds a single new member `key`.
 */
module[ExportInterface]({
  members: { key: null },
  bases: [ IObservable ]
})