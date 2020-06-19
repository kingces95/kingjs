var {
  '@kingjs': {
    '-rx': {
      '-static': { counter },
      '-sync': { Skip, Take, Then,
        '-static': { throws: syncThrows }
      },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Wait for a time before throwing.
 * @param {*} [timeOut] The milliseconds before emitting `error`. 
 * @returns Returns a subscription.
 */
function throws(error, timeOut, options) {
  return counter(timeOut, options)
    [Take](1)
    [Skip](1)
    [Then](syncThrows(error))
}

module.exports = throws