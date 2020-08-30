var {
  '@kingjs': {
    EmptyObject,
    IObserver: { Next, Complete },
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Emit a count starting at zero.
 * @param count The number of emissions. Default is zero.
 * @param options Options { ms, pollMs } to control the delay 
 * between emissions and the polling interval.
 * @returns A cancellation function.
 * 
 * @remarks The first emission happens after a delay. If the delay
 * is zero, it happens on the next tick.
 */
function counter(count = 0, options = EmptyObject) {
  var { ms, pollMs } = options
  var current = 0

  return create(function*(observer) {
    while(true) {
      yield ms
      if (current == count)
        break
      observer[Next](current++)
    }

    observer[Complete]()
  }, { 
    pollMs, 
    name: counter.name
  })
}

module.exports = counter