var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx': {
      '-observer': { construct },
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
  var actions = construct(...arguments)

  return create(observer => {
    var cancel
    var cancelled = false

    this[Subscribe]({
      [Initialize](cancelSource) {
        cancel = () => { 
          cancelled = true
          cancelSource() 
        }

        if (actions[Initialize])
          actions[Initialize](cancel)
        
        if (cancelled)
          return

        observer[Initialize](cancel)
      },
      [Next](o) {
        if (actions[Next])
          actions[Next](o)

        if (cancelled)
          return

        observer[Next](o)
      },
      [Complete]() {
        if (actions[Complete])
          actions[Complete]()

        if (cancelled)
          return

        observer[Complete]()
      },
      [Error](e) {
        if (actions[Error])
          actions[Error](e)

        if (cancelled)
          return

        observer[Error](e)
      }
    })

    return cancel
  })
}

module[ExportExtension](IObservable, spy)