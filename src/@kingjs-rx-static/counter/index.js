var {
  '@kingjs': {
    IObserver: { Next },
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

var TickMs = 0
var EmptyObject = { }

/**
 * @description Emit `Date.now()` endlessly at a specified interval.
 * @param {*} [tickMs] Milliseconds between observations. 
 * @returns A cancellation function.
 */
function counter(tickMs = TickMs, options = EmptyObject) {

  return create(function*(observer) {
    var tick = 0
    while(true) {
      yield tickMs
      observer[Next](tick++)
    }
  }, { 
    ...options, 
    name: counter.name
  })
}

module.exports = counter