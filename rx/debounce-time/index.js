var { 
  ['@kingjs']: {
    rx: { create },
    linq: { ToObservable },
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

/**
 * @description Filter values by those followed without
 * emissions for `duration` milliseconds.
 * 
 * @this any `this` The observable whose values will be filtered.
 * 
 * @param foo `duration` The time in milliseconds an emission must
 * be followed by no additional emission to pass through this filter.
 * 
 * @returns Returns an observable whose values are filtered by
 * emissions followed by no emissions for `duration` milliseconds.
 */
function debounceTime(duration) {
  var observable = this;

  return create(observer => {
    var start;
    var cancel;

    var dispose = observable[Subscribe](
      o => {
        var now = Date.now();
        if (start && now - start < duration)
          cancel();

        cancel = [o]
          [ToObservable](duration)
          [Subscribe](x => observer[Next](x));

        start = now;
      },
      () => observer[Complete](),
      o => observer[Error]()
    );

    return () => {
      if (dispose)
        dispose();
        
      if (cancel)
        cancel();
    }
  })
}

exportExtension(module, IObservable, debounceTime);
