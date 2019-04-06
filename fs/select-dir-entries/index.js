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
 * @description Returns an `IObservable` that blends this `IObservable`
 * with those passed as arguments.
 */
function selectDirEntries() {
  return this[SelectMany](path => {
    return create(observer => {
      try {
        fs.readdir(path, Options, entries => {
          for (var e of entries)
            observer[Next](e);
          observer[Complete]();
        });
      } 
      catch(e) { 
        observer[Error](e); 
      }
    })
  })
}

exportExtension(module, IObservable, selectDirEntries);
