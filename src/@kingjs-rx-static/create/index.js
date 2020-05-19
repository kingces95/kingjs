var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { sleep },
    '-rx-observer': { create: createObserver, Checked },
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => undefined

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param {*} subscribe The subscribe implementation.
 * 
 * @callback subscribe
 * @param observer A pojo with properties `Next`, `Complete`, 
 * and/or `Error`.
 * 
 * @remarks Defaults are provided for missing `Next`, `Complete`, 
 * and/or `Error` handlers.
 */
function create(subscribe) {
  assert(subscribe)

  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)      
      var checkedObserver = observer[Checked]()
      var cancelled = false

      process.nextTick(async () => {
        if (cancelled)
          return
          
        for (ticks of subscribe(checkedObserver)) {
          await sleep(ticks)
          if (cancelled)
            break
        }
      })

      return () => cancelled = true
    }
  }
}

module.exports = create