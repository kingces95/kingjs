var { 
  '@kingjs': { IObserver,
    '-rx': { create },
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
        observer[IObserver.Next](o);
        
      observer[IObserver.Complete]();
    } catch(e) { 
      observer[IObserver.Error](e);
    }
  });
}

module.exports = from;