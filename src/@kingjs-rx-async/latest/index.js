var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Asynchronously map observations but only emit those 
 * observations that were the latest to begin executing.
 * @this any The source `IObservable`.
 * @param callback The asynchronous mapping function.
 * @returns Returns a new `IObservable` that emits the latest mapped 
 * values.
 */
function select(callback = Identity) {
  return create(observer => {
    var now = 0
    var last = 0
    var completed = 0
    var cancelled = false

    var cancel = this[Subscribe]({
      [Next](o) {
        now++
        run(now)

        function run(timestamp) {
          process.nextTick(async () => {
            var value = await callback(o)

            if (timestamp != now)
              return

            if (cancelled)
              return

            observer[Next](value)
            last = now

            if (completed)
              observer[Complete]()
          })
        }
      },
      [Complete]() {
        if (cancelled)
          return

        completed++
        if (last != now)
          return

        observer[Complete]()
      },
      [Error](e) {
        if (cancelled)
          return

        observer[Error](e)
        cancelled = true
      }
    })

    return () => {
      cancel()
      cancelled = true
    }
  })
}

module[ExportExtension](IObservable, select)
