var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable: { Subscribe },
    '-function': { Rename },
    '-promise': { sleep },
    '-rx-observer': { create: createObserver, SubscriptionTracker, Check },
  }
} = module[require('@kingjs-module/dependencies')]()

var PollMs = 100
var Scheduler = 'Scheduler'

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
      var uncheckedObserver = createObserver(...arguments)      
      var observer = uncheckedObserver[Check]()
      var subscription = new SubscriptionTracker(observer)

      var task = async () => {
        for (var ms of generator(observer)) {
          if (subscription.cancelled)
            return

          if (ms === undefined)
            ms = 0

          var start = Date.now()
          do {
            await sleep(Math.min(pollMs, ms))
            if (subscription.cancelled)
              return
          } while (Date.now() - start < ms)
        }
      }

      process.nextTick(task)

      return subscription.cancel
    }
  }

  return result
}

module.exports = create