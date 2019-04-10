var {
  ['@kingjs']: { 
    rx: { create },
    promise: { sleep }
  },
} = require('./dependencies');

var PollingInterval = 100;

/**
 * @description Returns an `IObservable` that emits no events
 * yet keeps the process alive until disposed.
 */
function never() {
  return create((observer) => {
    var disposed;

    process.nextTick(async () => {
      while(!disposed)
        await sleep(PollingInterval);
    });

    return () => disposed = true;
  });
}

module.exports = never;