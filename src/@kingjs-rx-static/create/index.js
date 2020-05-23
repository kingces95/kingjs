var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { sleep },
    '-rx-observer': { create: createObserver, Check },
  }
} = module[require('@kingjs-module/dependencies')]()

var PollMs = 100
var EmptyObject = { }

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param {*} subscribe The subscribe implementation.
 * @param {*} [options] Options are `pollMs` (default 100) to control cancellation 
 * notification polling. 
 * 
 * @callback subscribe
 * @param observer A pojo with properties `Next`, `Complete`, 
 * and/or `Error`.
 * 
 * @remarks Defaults are provided for missing `Next`, `Complete`, 
 * and/or `Error` handlers.
 */
function create(subscribe, options = EmptyObject) {
  assert(subscribe)
  var {
    pollMs = PollMs, 
  } = options

  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)      
      var checkedObserver = observer[Check]()
      var cancelled = false

      process.nextTick(async () => {
        if (cancelled)
          return

        for (var ms of subscribe(checkedObserver)) {
          var start = Date.now()

          do {
            await sleep(Math.min(pollMs, ms))

            if (cancelled)
              return
              
          } while (Date.now() - start < ms)
        }
      })

      return () => cancelled = true
    }
  }
}

module.exports = create