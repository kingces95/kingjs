var {
  '@kingjs': { IObservable, IObserver,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ISubject` extends `IObservable` and `IObserver`.
 */
module[ExportInterface]({
  bases: [ IObservable, IObserver ]
})