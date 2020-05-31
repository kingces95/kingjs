var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
    '-rx': { 
      '-observer': { Proxy, CheckAsync },
      '-sync-static': { create, empty, throws }
    },
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
 * @remarks - When `iterable` is exhausted the `IObservable` will complete and
 * will cancel its subscription to the original observable.
 * @remarks - Upon subscription the `iterable` will be created and asked to 
 * generate it's first item. If `iterable` is empty the original observable 
 * will not even be subscribed. 
 */
function zip(iterable = Empty, callback = ToKeyValue) {
  return create(observer => {

    var iterator = iterable()
    var { done, value } = iterator.next()
    if (done) {
      if (value)
        return throws(value)
      return empty()
    }

    var cancel = this[Subscribe](
      observer[Proxy]({
        [Next](o) {
          this[Next](callback(o, value))

          var next = iterator.next()
          value = next.value
          if (!next.done)
            return

          if (value) 
            this[Error](value)
          else 
            this[Complete]()

          cancel()
        },
      })[CheckAsync]()
    )

    return cancel
  })
}

module[ExportExtension](IObservable, zip)