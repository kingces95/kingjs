var { 
  assert,
  ['@kingjs']: {
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    rx: { 
      create,
      IObserver: { Next, Complete, Error },
    },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Create an `IObservable` from a generator or 
 * implementor of the iterator protocol.
 * 
 * @param value `foo` comment.
 * 
 * @returns Returns `IObservable` that emits elements in value.
 * 
 * @remarks As all values are emitted synchronously, this is primarily
 * a toy or testing tool with limited practical use otherwise.
 */
function from(value) {
  return create(function(observer) {
    try {
      for (var o of value)
        observer[Next](o);
        
      observer[Complete]();
    } catch(e) { 
      observer[Error](e);
    }
  });
}

module.exports = from;