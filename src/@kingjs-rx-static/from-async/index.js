var { 
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from an async generator.
 * @param generator The generator whose values are to be emitted.
 * @returns Returns `IObservable` that emits elements returned by an async generator.
 */
function fromAsync(generator) {
  return create(function(observer) {
    var stop

    process.nextTick(async () => {
      try {
        for await (var o of generator()) {
          if (stop)
            return
            
          observer[Next](o)
        }

        if (stop)
          return

        observer[Complete]()
      } catch(e) { 
        observer[Error](e)
      }
    })

    return () => stop = true
  })
}

module.exports = fromAsync