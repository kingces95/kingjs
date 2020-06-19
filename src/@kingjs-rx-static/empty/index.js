var {
  '@kingjs': {
    '-rx': {
      '-static': { counter },
      '-sync': { Skip, Take },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Wait for a time before completing.
 * @param {*} [timeOut] The milliseconds before emitting `complete`. 
 * @returns Returns a subscription.
 */
function empty(timeOut, options) {
  return counter(timeOut, options)
    [Take](1)
    [Skip](1)
}

module.exports = empty