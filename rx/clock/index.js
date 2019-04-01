var {
  ['@kingjs']: {
    endless,
    promise: { sleep },
    rx: { create },
    IObserver: { Next, Error },
  },
} = require('./dependencies');

var endlessZero = () => 0;

/**
 * @description Create an `IObservable` that asynchronously emits `Date.now()` endlessly.
 * 
 * @param {*} [timeOut] A function that returns the time to wait in milliseconds
 * before the next emission. 
 * 
 * @returns A function which can be called to cancel the emission of values.
 */
function clock(timeOut = endlessZero) {
  timeOut = endless(timeOut);

  return create(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      try {
        while (true) {

          // sleep
          await sleep(await timeOut());

          // externally terminated
          if (cancelled)
            return;

          // emit tick
          observer[Next](Date.now());
        }
      } catch(e) { 
        observer[Error](e);
      }
    });

    return () => {
      cancelled = true
    };
  });
}

module.exports = clock;