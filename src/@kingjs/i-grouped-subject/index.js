var {
  '@kingjs': { IGroupedObservable, ISubject,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedObservable` extends `ISubject`.
 */
module[Export]({
  bases: [ IGroupedObservable, ISubject ]
})