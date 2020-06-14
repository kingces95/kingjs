var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { sleep },
    '-rx-observer': { create: createObserver, TryInitialize, Check },
  }
} = module[require('@kingjs-module/dependencies')]()

var PollMs = 100
var EmptyObject = { }

/**
 * @description Transforms a generator into an `IObservable`.
 * @param {*} generator The generator.
 * @param {*} [options] Options are `pollMs` (default 100) to control cancellation 
 * notification polling. 
 * 
 * @callback subscribe
 * @param observer The observer `generator` uses to emit events.
 * 
 * @remarks Yield the milliseconds to delay before resuming generation.
 * @remarks Yield at least once between emissions to check for cancellation.
 */
function create(generator, options = EmptyObject) {
  assert(generator)
  var { 
    pollMs = PollMs,
  } = options

  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)      
      var checkedObserver = observer[Check]()

      var cancelled = false
      var cancel = () => cancelled = true
      if (!checkedObserver[TryInitialize](cancel))
        return cancel

      process.nextTick(async () => {
        if (cancelled)
          return

        for (var ms of generator(checkedObserver)) {
          if (cancelled)
            return

          var start = Date.now()
          if (ms === undefined)
            ms = 0

          do {
            await sleep(Math.min(pollMs, ms))
            if (cancelled)
              return
          } 
          while (Date.now() - start < ms)
        }
      })

      return cancel
    }
  }
}

module.exports = create