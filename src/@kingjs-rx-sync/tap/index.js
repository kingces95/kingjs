var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-sync-static': { create },
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Tap into an event stream by copying events to another `IObservable`.
 * @this any The source `IObservable` whose events are copied.
 * @param callback The action to take on tapped stream.
 * 
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable`.
 * 
 * @callback 
 * @param observable A copy of the source `IObservable`
 * 
 * @remarks Cancelling a subscription to a tapped `IObservable` does not 
 * cancel the subscription to the tap itself.
 */
function tap(callback) {

  return create(observer => {
    var subject = new Subject()
    callback(subject)

    return this[Subscribe]({
      [Next](o) {
        subject[Next](o)
        observer[Next](o)
      },
      [Complete]() {
        subject[Complete]()
        observer[Complete]()
      },
      [Error](e) {
        subject[Error](e)
        observer[Error](e)
      }
    })
  })
}

module[ExportExtension](IObservable, tap)