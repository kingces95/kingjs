var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete },
    '-interface': { ExportExtension },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': { Where,
        '-static': { create },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Emit while a predicate is satisfied.
 * @this any The source `IObservable` whose emission are returned.
 * @param predicate The predicate. 
 * @returns Returns an `IObservable` that emits so long as a predicate
 * is satisfied.
 * 
 * @remarks The promise will cancel its subscription the first
 * time the predicate is not satisfied.
 */
function takeWhile(predicate) {
  var taking = true
  return this
    [Where](o => taking && (taking = predicate(o)))
}

module[ExportExtension](IObservable, takeWhile)
