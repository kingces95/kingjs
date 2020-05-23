var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-sync-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Skips observations followed within specified
 * time period by another observation.
 * @this any The observable.
 * @param window The time in milliseconds an emission must
 * be followed by no additional emission to pass through this 
 * filter.
 * 
 * @returns Returns an observable whose values are filtered by
 * emissions followed by no emissions for `duration` milliseconds.
 */
function debounce(window) {
  var lastId = 0
  var cancelled = false

  function delay(action, id = 0) {
    setTimeout(() => {
      if (cancelled)
        return
      
      if (id && id != lastId)
        return

      action()
    }, window)
  }

  return create(observer => {
    var cancel = this[Subscribe]({
      [Next](o) { 
        delay(() => observer[Next](o), ++lastId)
      },
      [Complete]() {
        delay(() => observer[Complete]())
      },
      [Error](e) {
        observer[Error](e)
        cancelled = true
      }
    })

    return () => {
      cancelled = true
      cancel()
    }
  })
}

module[ExportExtension](IObservable, debounce)
