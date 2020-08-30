var { assert,
  '@kingjs': {
    EmptyObject,
    IObserver,
    IObserver: { Subscribed, Next, Complete, Error },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Overrides `IObserver` functions.
 * @this any The source `IObserver` whose functions will be overridden.
 * @param actions Overrides of select `IObserver` functions.
 * 
 * @description Overrides are passed the source `IObservable` as `this`.
 */
function proxy(actions = EmptyObject) {
  assert(this instanceof IObserver)
  
  return {
    [Subscribed]: o => {
      if (actions[Subscribed])
        actions[Subscribed].call(this, o)
      else
        this[Subscribed](o)
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

module[ExportInterfaceExtension](IObserver, proxy)
