var {
  '@kingjs': {
    '-rx': {
      '-static': { counter },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Wait for a time before completing.
 * @param [options] Options { ms, pollMs } to specify the 
 * milliseconds before emitting `complete` and the polling interval. 
 * @returns Returns a subscription.
 */
function empty(options) {
  return counter(0, options)
}

module.exports = empty