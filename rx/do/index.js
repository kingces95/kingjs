var { 
  ['@kingjs']: {
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      is,
      exportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Returns an `IObservable` that spies on life-cycle events.
 * 
 * @this any The source `IObservable` whose live-cycle events are spied upon.
 * 
 * @param next An `IObserver` that spies on the life-cycle events and their
 * corresponding values or the `next` function of such an `IObserver`.
 * @param [complete] If `next` is a function, this may be the `complete` function
 * of the `IObserver`
 * @param [error] If `next` is a function, this may be the `error` function
 * of the `IObserver`
 * 
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by the `observer`.
 * 
 * @remarks Like `subscribe` except instead of returning a disposable 
 * function, another `IObservable` is returned.
 */
function do_(next, complete, error) {
  var observable = this;

  if (is.object(next))
    return do_(next[Next], next[Complete], next[Error]);

  return create(observer => {
    return observable[Subscribe](
      o => {
        if (next)
          next(o)
        observer[Next](o)
      },
      () => {
        if (complete)
          complete()
        observer[Complete]()
      },
      o => {
        if (error)
          error(o)
        observer[Error](o)
      }
    );
  })
}

exportExtension(module, IObservable, do_);
