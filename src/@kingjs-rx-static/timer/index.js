var {
  '@kingjs': {
    '-rx': { Take,
      '-static': { clock },
      '-sync': { Skip }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` that waits for `timeOut` 
 * milliseconds and then emits `completed`.
 * @param {*} [timeOut] The milliseconds before emitting `complete`. 
 * @returns A function which can be called to cancel the timer.
 */
function timer(timeOut, options) {
  return clock(timeOut, options)
    [Take](1)
    [Skip](1)
}

module.exports = timer