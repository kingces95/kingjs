var {
  '@kingjs': {
    IObservable,
    '-rx-async': { Zip },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Report only the first `count` observation.
 * @param count The number of observations to report.
 * @returns Returns an `IObservable` that reports only the first `count`
 * observations.
 */
function take(count) {
  return this[Zip](function*() {
    for (var i = 0; i < count; i++)
      yield
  }, (observation, value) => observation)
}

module[ExportExtension](IObservable, take)
