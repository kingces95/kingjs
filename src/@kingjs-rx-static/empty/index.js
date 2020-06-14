var {
  '@kingjs': {
    '-rx': {
      '-static': { clock },
      '-sync': { Skip },
      '-async': { Take }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Wait for a time before completing.
 * @param {*} [timeOut] The milliseconds before emitting `complete`. 
 * @returns Returns a subscription.
 */
function empty(timeOut, options) {
  return clock(timeOut, options)
    [Take](1)
    [Skip](1)
}

module.exports = empty