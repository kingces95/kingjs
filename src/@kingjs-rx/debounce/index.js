var { 
  ['@kingjs']: {
    rx: { 
      create, 
      clock,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Filter values by those followed without
 * emissions for `duration` milliseconds.
 * 
 * @this any The observable whose values will be filtered.
 * 
 * @param window The time in milliseconds an emission must
 * be followed by no additional emission to pass through this filter.
 * 
 * @returns Returns an observable whose values are filtered by
 * emissions followed by no emissions for `duration` milliseconds.
 */
function debounce(window) {
  var observable = this;

  return create(observer => {
    var received;   // time of last observation & clock running
    var value;      // last observed value
    var completeOrError;
    var startClock;
    var timeOut;
    var getTimeOut = () => timeOut;

    // clock will wait for this promise to be resolved
    // the promise is resolved when an observation is made
    // observations reset `received` timestamp
    // if the clock wakes up after `window` to discover `received` has advanced,
    // then clock puts itself to sleep `received` is eligible for emission.
    // the clock will emit a value if a window of time elapsed since the last observation
    // and then stop itself by awaiting a new promise
    timeOut = new Promise(o => startClock = o);

    var disposeClock = clock(getTimeOut)[Subscribe](
      now => {

        // filter values to those followed by `window` ms
        var elapsed = now - received;
        if (elapsed < window) {
          timeOut = window - elapsed;
          return;
        }

        // emit value
        observer[Next](value);

        // check for completed or error
        if (completeOrError) {
          completeOrError();
          return;
        }

        //  reset received time/pause clock
        received = undefined;
        timeOut = new Promise(o => startClock = o);
      }
    );

    var dispose = observable[Subscribe](
      o => {

        // ignore observations after observing complete/error
        if (completeOrError)
          return;

        value = o;

        // start clock
        if (!received)
          startClock(window);

        received = Date.now();
      },
      () => {
        completeOrError = () => observer[Complete]();
        if (!received)
          completeOrError();    
      },
      o => {
        completeOrError = () => observer[Error](o);
        if (!received)
          completeOrError();
      }
    );

    return () => {
      dispose();
      disposeClock();
    }
  })
}

exportExtension(module, IObservable, debounce);
