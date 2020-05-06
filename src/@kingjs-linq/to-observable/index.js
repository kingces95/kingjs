var { 
  '@kingjs': {
    reflect: { exportExtension },    
    rx: { create },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Returns a cold IObservable of an IEnumerable published
 * at a specified `interval` until exhausted.
 * 
 * @this any `this` The enumerable from which elements are pulled.
 * 
 * @param foo `interval` The period at which to pull elements from
 * the enumerable and publish them to the observers.
 * 
 * @returns Returns a cold IObservable.
 */
function toObservable(interval) {
  var enumerable = this;

  return create(interval, function(next) {
    var enumerator = this.enumerator;

    if (!enumerator)
      enumerator = this.enumerator = enumerable[GetEnumerator]();

    if (!enumerator[MoveNext]())
      return false;

    next(enumerator[Current]);
    return true;
  });
}

exportExtension(module, IEnumerable, toObservable);