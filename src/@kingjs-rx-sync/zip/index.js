var {
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-interface': { ExportExtension },
    '-rx-sync-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

function *Empty() { }
var ToKeyValue = (key, value)  => ({ key, value })

/**
 * @description Zip observations with values pulled from a generator.
 * 
 * @this any The source `IObservable` to zip.
 * @param iterable The iterable to pull values from to zip to the generator.
 * @param callback The callback that zips values.
 * @returns An `IObservable` whose emitted values are those returned by `callback`
 * 
 * @callback
 * @param key The value pushed from the `IObservable`.
 * @param value The value pulled from the `iterable`.
 * @returns Returns the value to be emitted by the zipped `IObservable`.
 * 
 * @remarks - When `iterable` is exhausted the `IObservable` will ignore 
 * additional observations except for `complete` (and `error`).
 */
function zip(iterable = Empty, callback = ToKeyValue) {
  return create(observer => {
    var iterator
    return this[Subscribe]({
      ...observer,
      [Next](o) {
        if (!iterator)
          iterator = iterable()

        var { done, value } = iterator.next()
        if (done) 
          return

        observer[Next](callback(o, value))
      },
    })
  })
}

module[ExportExtension](IObservable, zip)
