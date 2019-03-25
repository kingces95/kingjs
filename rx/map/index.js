var { 
  ['@kingjs']: {
    rx: { create },
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
function map(callback) {
  var observable = this;

  return create(observer => {
    return observable[Subscribe](
      o => observer[Next](callback(o)),
      () => observer[Complete](),
      o => observer[Error]()
    );
  })
}

exportExtension(module, IObservable, map);
