var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { create },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultSelector = o => o

/**
 * @description Returns an `IObservable` whose each value is an array
 * containing the current value followed by previously emitted values.
 * 
 * @param selector A callback that selects a value from an array containing
 * the current value and a number of previous values.
 * @param [size] The count of the previous values to include in the window.
 * The default is `1`.
 * 
 * @returns Returns an `IObservable` whose each value is
 * an array containing the current value followed by previously 
 * emitted values or a selection of that array.
 */
function rollingSelect(
  selector,
  count = 1) {

  var observable = this
  var window = []

  return create(observer => {
    return observable[Subscribe](
      o => {
        window.unshift(o)

        if (window.length > count + 1)
          window.pop()
        
        observer[Next](selector(window))
      },
      () => observer[Complete](),
      o => observer[Error](o)
    )
  })
}

ExportExtension(module, IObservable, rollingSelect)
