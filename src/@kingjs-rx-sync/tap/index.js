var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-observer': { Proxy },
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
    var tapCancelled = false
    var cancelTap = () => tapCancelled = true
    var subject = new Subject(cancelTap)
    callback(subject)

    var cancelled = false
    var cancel

    this[Subscribe](
      observer[Proxy]({
        [Initialize](cancelSource) {
          observer[Initialize](cancel = () => { 
            cancelled = true
            cancelSource() 
          })
        },
        [Next](o) {
          if (!tapCancelled)
            subject[Next](o)

          if (cancelled)
            return

          observer[Next](o)
        },
        [Complete]() {
          if (!tapCancelled)
            subject[Complete]()

          if (cancelled)
            return

          observer[Complete]()
        },
        [Error](e) {
          if (!tapCancelled)
            subject[Error](e)

          if (cancelled)
            return

          observer[Error](e)
        }
      })
    )

    return cancel
  })
}

module[ExportExtension](IObservable, tap)