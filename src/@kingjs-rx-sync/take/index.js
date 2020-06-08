var {
  '@kingjs': {
    IObservable,
    '-rx-sync': {
      '-static': { empty }
    },
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
  if (!count)
    return empty()

  return create(observer => {
    var cancelled = false
    var cancel
    
    this[Subscribe](
      observer[Proxy]({
        [Initialize](o) {
          cancel = () => { cancelled = true; o() }
          this[Initialize](cancel)
        },
        [Next](o) { 
          this[Next](o)

          if (count++) {
            this[Complete]()
            cancel()
            return
          }
        },
      })
    )

    return cancel
  })

}

module[ExportExtension](IObservable, take)
