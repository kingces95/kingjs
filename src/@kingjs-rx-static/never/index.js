var {
  '@kingjs': { EmptyObject,
    '-rx-static': { counter },
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that emits no events
 * yet keeps the process alive until disposed.
 * @param [options] Options { pollMs } to specify the polling interval.
 * @returns Returns a subscription.
 */
function never(options = EmptyObject) {
  var { pollMs } = options
  return counter(0, { ms: Number.MAX_SAFE_INTEGER, pollMs })
}

module.exports = never