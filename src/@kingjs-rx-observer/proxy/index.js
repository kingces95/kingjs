var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Asserts an observers calls are orderly.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 */
function proxy(observer) {
  return {
    [Next]: o => {
      if (observer[Next])
        observer[Next].call(this, o)
      else
        this[Next](o)
    },
    [Complete]: () => {
      if (observer[Complete])
        observer[Complete].call(this)
      else
        this[Complete]()
    },
    [Error]: e => {
      if (observer[Error])
        observer[Error].call(this, e)
      else
        this[Error](e)
    }
  }
}

module[ExportExtension](IObserver, proxy)
