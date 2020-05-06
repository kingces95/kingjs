var { 
  '@kingjs': {
    rx: { 
      create, 
      sleep, 
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Call an emitted function and drop any subsequent 
 * emissions until the call is complete plus a timeOut.
 * 
 * @this any The `IObservable` whose emissions will be called.
 * 
 * @param [timeOut] The time in milliseconds after a call completes
 * that further emissions should continue to be dropped.
 * 
 * @returns Returns the result of the function calls.
 */
function call(timeOut) {
  var observable = this;

  return create(observer => {
    var paused;

    return observable[Subscribe](
      o => {
        if (paused)
          return;

        paused = true;
        process.nextTick(async () => {
          observer[Next](await o());
          if (timeOut)
            await sleep(timeOut);
          paused = false;
        })
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, call);
