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
function latest(callback = Identity) {
  return create(observer => {
    var now = 0
    var last = 0
    var completed = false
    var cancelled = false

    function throws(e) {
      if (cancelled)
        return

      observer[Error](e)
      cancelled = true
    }

    var cancel = this[Subscribe]({
      [Next](o) {
        now++
        run(now)

        function run(timestamp) {
          process.nextTick(async () => {
            try {
              var value = await callback(o)

              if (timestamp != now)
                return

              if (cancelled)
                return

              observer[Next](value)

              last = now

              if (completed)
                observer[Complete]()
            } 
            catch(e) {
              throws(e)
            }
          })
        }
      },
      [Complete]() {
        if (cancelled)
          return

        completed = true
        if (last != now)
          return

        observer[Complete]()
      },
      [Error](e) {
        throws(e)
      }
    })

    return () => {
      cancel()
      cancelled = true
    }
  })
}

module[ExportExtension](IObservable, latest)
