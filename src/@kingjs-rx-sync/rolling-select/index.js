var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultSelector = o => o
var DefaultWindowSize = 1

/**
 * @description Emit a sliding window of values.
 * @param [selector] Selects a value from the window (default is identity). 
 * @param [size] The window size (default 1).
 * @returns Returns an `IObservable` which emits arrays containing the current 
 * value followed by previously emitted values.
 * 
 * @remarks The array is reused between emissions.
 */
function rollingSelect(
  selector = DefaultSelector,
  count = DefaultWindowSize) {

  return create(observer => {
    var window = [ ]
    return this[Subscribe]({
      ...observer,
      [Next](o) {

        if (window.length == count)
          window.pop()
        window.unshift(o)
        
        observer[Next](selector(window))
      },
    })
  })
}

module[ExportExtension](IObservable, rollingSelect)
