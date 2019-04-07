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

var Options = { };

/**
 * @description Returns an `IObservable` that blends this `IObservable`
 * with those passed as arguments.
 */
function selectStat() {
  return this[SelectMany](path => {
    return create(observer => {
      try {
        fs.stat(path, Options, (error, stats) => {
          if (error)
            return observer[Error](error);

          stats.path = path;
          observer[Next](stats);
        });
      } 
      catch(e) { 
        observer[Error](e); 
      }
    })
  })
}

exportExtension(module, IObservable, selectStat);
