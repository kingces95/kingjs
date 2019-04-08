var {
  fs,
  ['@kingjs']: {
    rx: { create, SelectMany },
    reflect: {
      exportExtension
    },
    IObservable,
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

var Options = { withFileTypes: true };

/**
 * @description Returns an `IObservable` emits values resolved
 * via a callback like a promise that returns many values.
 */
function promise(callback) {
  return this[SelectMany](dir => {
    return create(observer => {
      try {
        fs.readdir(dir, Options, (error, entries) => {
          if (error)
            return observer[Error](error);

          for (var e of entries) {
            e.dir = dir;
            observer[Next](e);
          }
        });
      } 
      catch(e) { 
        observer[Error](e); 
      }
    })
  })
}

exportExtension(module, IObservable, promise);
