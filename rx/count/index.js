var { 
  ['@kingjs']: {
    rx: { Observable },
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

/**
 * @description The description.
 * 
 * @this any `this` comment.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
function count() {
  var observable = this;

  return new Observable(observer => {
    var i = 0;
    return observable[Subscribe](
      () => i++,
      () => { 
        observer[Next](i);
        observer[Complete]();
      },
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, count);