var {
  ['@kingjs']: {
    promise: { sleep },
    rx: { create },
    IObserver: { Next, Complete },
  },
} = require('./dependencies');

/**
 * @description Create an `IObservable` that waits for `timeOut` milliseconds
 * and then emits `completed`.
 * 
 * @param {*} [timeOut] The milliseconds before emitting `complete`. If zero,
 * the timer will emit in the `nextTick`.
 * 
 * @returns A function which can be called to cancel the timer.
 */
function timer(timeOut = 0) {

  return create(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      // sleep
      await sleep(timeOut);

      // externally terminated
      if (cancelled)
        return;

      // complete
      observer[Complete]();
    });

    return () => cancelled = true;
  });
}

module.exports = timer;