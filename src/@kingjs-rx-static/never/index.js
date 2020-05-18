var {
  '@kingjs': { 
    '-rx-static': { timer },
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an `IObservable` that emits no events
 * yet keeps the process alive until disposed.
 */
function never() {
  return timer(Number.MAX_SAFE_INTEGER)
}

module.exports = never