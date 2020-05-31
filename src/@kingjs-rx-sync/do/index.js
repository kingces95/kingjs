var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { create: createObserver },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that spies on events.
 * @this any The source `IObservable` whose events are spied upon.
 * @param observer The observer that does the spying.
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `observer`.
 */
function spy() {
  var actions = createObserver(...arguments)

  return create(observer => {
    return this[Subscribe]({
      [Next](o) {
        actions[Next](o)
        observer[Next](o)
      },
      [Complete]() {
        actions[Complete]()
        observer[Complete]()
      },
      [Error](e) {
        actions[Error](e)
        observer[Error](e)
      }
    })
  })
}

module[ExportExtension](IObservable, spy)