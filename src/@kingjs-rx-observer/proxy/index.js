var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Initialize, Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts an observers calls are orderly.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 */
function proxy(actions) {
  assert(this instanceof IObserver)
  
  return {
    [Initialize]: o => {
      if (actions[Initialize])
        actions[Initialize].call(this, o)
      else
        this[Initialize](o)
    },
    [Next]: o => {
      if (actions[Next])
        actions[Next].call(this, o)
      else
        this[Next](o)
    },
    [Complete]: () => {
      if (actions[Complete])
        actions[Complete].call(this)
      else
        this[Complete]()
    },
    [Error]: e => {
      if (actions[Error])
        actions[Error].call(this, e)
      else
        this[Error](e)
    }
  }
}

module[ExportExtension](IObserver, proxy)
