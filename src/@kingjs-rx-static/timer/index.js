var {
  '@kingjs': {
    IObserver: { Complete },
    '-promise': { sleep },
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

var PollingInterval = 10

/**
 * @description Create an `IObservable` that waits for `timeOut` milliseconds
 * and then emits `completed`.
 * 
 * @param {*} [timeOut] The milliseconds before emitting `complete`. If zero,
 * the timer will emit in the `nextTick`.
 * 
 * @returns A function which can be called to cancel the timer.
 */
function timer(timeOut = 0, pollingInterval = PollingInterval) {

  return create(observer => {
    var canceled = false

    var start = Date.now()
    process.nextTick(async () => {
      while(true) {
        if (canceled)
          return

        if (Date.now() - start < timeOut) {
          await sleep(pollingInterval)
          continue
        }

        break
      }
      
      observer[Complete]()
    })

    return () => canceled = true
  })
}

module.exports = timer