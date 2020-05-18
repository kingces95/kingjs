var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx-static': { create },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Noop = () => undefined

/**
 * @description Returns an `IObservable` that spies on events.
 * @this any The source `IObservable` whose events are spied upon.
 * @param observer The observer that does the spying.
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `observer`.
 */
function spy(observer = EmptyObject) {
  assert(observer)
  var observable = this

  // overload
  if (observer instanceof Function) {
    observer = {
      [Next]: arguments[0],
      [Complete]: arguments[1],
      [Error]: arguments[2],
    } 
  }

  // defaults
  var {
    [Next]: next = Noop,
    [Complete]: complete = Noop,
    [Error]: error = Noop
  } = observer
  
  return create(observer => {
    return observable[Subscribe]({
      [Next](o) {
        next(o)
        observer[Next](o)
      },
      [Complete]() {
        complete()
        observer[Complete]()
      },
      [Error](e) {
        error(e)
        observer[Error](e)
      }
    })
  })
}

module[ExportExtension](IObservable, spy)