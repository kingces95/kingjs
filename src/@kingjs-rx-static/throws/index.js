var {
  '@kingjs': {
    '-rx': {
      '-static': { empty },
      '-sync': { Then,
        '-static': { throws: syncThrows }
      },
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Wait for a time before throwing.
 * @param [options] Options { ms, pollMs } to specify the 
 * milliseconds before emitting `complete` and the polling interval. 
 * @returns Returns a subscription.
 */
function throws(error, options) {
  return empty(options)
    [Then](syncThrows(error))
}

module.exports = throws