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
function debounceTime(window) {
  var observable = this;

  return create(observer => {
    var received;
    var value;
    var delay;
    var nextTick = () => delay;
    
    var start;
    delay = new Promise(resolve => start = resolve);
    var disposeClock = clock(nextTick)[Subscribe](
      now => {

        // filter values to those followed by `window` ms
        var elapsed = now - received;
        if (elapsed < window) {
          delay = window - elapsed;
          return;
        }

        // emit value and reset received time
        observer[Next](value);
        received = undefined;

        // pause clock
        delay = new Promise(resolve => start = resolve);
      }
    );

    var dispose = observable[Subscribe](
      o => {
        value = o;
        var now = Date.now();

        // start clock
        if (!received)
          start(window);
          
        received = now;
      },
      () => {
        if (!received)
          received = window;
        var elapsed = Date.now() - received;

        // drain last value
        setTimeout(() => observer[Complete](), window - elapsed)
      },
      o => observer[Error](o)
    );

    return () => {
      dispose();
      disposeClock();
    }
  })
}

exportExtension(module, IObservable, debounceTime);
