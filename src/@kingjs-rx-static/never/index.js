var {
  '@kingjs': { 
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

var MAX_SAFE_INTEGER_32 = 0x7FFFFFFF

/**
 * @description Returns an `IObservable` that emits no events
 * yet keeps the process alive until disposed.
 */
function never() {
  return create(function*() { 
    yield MAX_SAFE_INTEGER_32
  })
}

module.exports = never