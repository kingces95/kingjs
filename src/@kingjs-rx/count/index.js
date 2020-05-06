var { 
  '@kingjs': {
    rx: { 
      create, 
      ToPromise,
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

  return create(observer => {
    var i = 0;
    return observable[Subscribe](
      () => i++,
      () => { 
        observer[Next](i);
        observer[Complete]();
      },
      o => observer[Error](o)
    );
  })[ToPromise]()
}

exportExtension(module, IObservable, count);