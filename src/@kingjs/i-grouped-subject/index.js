var {
  '@kingjs': { IGroupedObservable, ISubject,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedObservable` extends `ISubject`.
 */
module[ExportInterface]({
  bases: [ IGroupedObservable, ISubject ]
})