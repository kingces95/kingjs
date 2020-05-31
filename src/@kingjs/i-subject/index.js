var {
  '@kingjs': { IObservable, IObserver,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ISubject` extends `IObservable` and `IObserver`.
 */
module[Export]({
  bases: [ IObservable, IObserver ]
})