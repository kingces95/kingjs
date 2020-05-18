var {
  '@kingjs': {
    IObserver: { Next, Complete },
    '-promise': { sleep },
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

var TickMs = 0
var PollMs = 100
var Count = Number.MAX_VALUE

/**
 * @description Emit `Date.now()` endlessly at a specified interval.
 * @param {*} [tickMs] Milliseconds between emssions. 
 * @param {*} [options] Options are `pollMs` (default 100) to control cacellation 
 * notification polling and `count` to limit number of emissions (default inifinity). 
 * @returns A cancellation function.
 */
function clock(tickMs = TickMs, options) {
  var {
    pollMs = PollMs, 
    count = Count 
  } = options

  var sleepMs = Math.min(pollMs, ticksMs)

  return create(observer => {
    var canceled = false
    var start = Date.now()

    process.nextTick(async () => {
      while(true) {
        if (canceled || !count)
          break 

        var now = Date.now()
        if (now - start < tickMs) {
          await sleep(sleepMs)
          continue
        }
        
        observer[Next](now)
        start = now
        count--
      }

      observer[Complete]()
    })

    return () => canceled = true
  })
}

module.exports = clock