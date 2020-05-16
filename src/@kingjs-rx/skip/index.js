var { 
  '@kingjs': {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      ExportExtension
    },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Returns an `IObservable` which skips the
 * first n observations.
 */
function skip(
  count
) {

  var observable = this;

  return create(observer => {
    var skipped = 0;

    return observable[Subscribe](
      o => {
        if (skipped++ < count)
          return;
        
        observer[Next](o);
      },
      () => observer[Complete](),
      o => observer[Error](o)
    );
  })
}

ExportExtension(module, IObservable, skip);
