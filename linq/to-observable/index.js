var { 
  ['@kingjs']: {
    reflect: { exportExtension },    
    rx: { Observable },
    promise: { sleep },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    IObserver: { Next, Complete, Error },
  }
} = require('./dependencies');

/**
 * @description Returns a cold IObservable of an IEnumerable published
 * at a specified `interval` until exhausted.
 * 
 * @this any `this` The enumerable from which elements are pulled.
 * 
 * @param foo `interval` The period at which to pull elements from
 * the enumerable and publish them to the observers.
 * 
 * @returns Returns a cold IObservable.
 */
function toObservable(interval) {
  var enumerable = this;

  return new Observable(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      try {
        var enumerator;

        while (true) {
          await sleep(interval);

          if (cancelled)
            return;

          if (!enumerator)
            enumerator = enumerable[GetEnumerator]();

          if (!enumerator[MoveNext]())
            return observer[Complete]();

          observer[Next](enumerator[Current]);
        }
      } catch(e) { 
        observer[Error](e);
      }
    });

    return () => cancelled = true;
  });
}

exportExtension(module, IEnumerable, toObservable);
