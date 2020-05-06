var { 
  '@kingjs': {
    rx: { 
      create,
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
 * @description Returns an `IObservable` which reports the
 * first n observation.
 */
function take(
  count
) {

  var observable = this;

  return create(observer => {
    var taken = 0;

    return observable[Subscribe](
      o => {
        if (taken == count)
          return;
        
        taken++;
        observer[Next](o);
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

exportExtension(module, IObservable, take);
