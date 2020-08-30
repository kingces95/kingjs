var {
  '@kingjs': { IGroupedObservable,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IWindowedObservable` extends `IGroupedObservable` and 
 * adds a single new member `previousKey`.
 */
module[ExportInterface]({
  members: { previousKey: null },
  bases: [ IGroupedObservable ]
})