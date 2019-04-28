var { 
  ['@kingjs']: {
    rx: { 
      create,
      Subject,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
      IPublishedObservable: { Value },
    },
    reflect: { 
      is,
      exportExtension
    },
  }
} = require('./dependencies')

/**
 * @description Returns an `IPublishedObservable` that saves its last 
 * observed value and will emit that value to any new subscribers.
 * 
 * @this any The source `IObservable`.
 * 
 * @param initialValue A value to emit to subscribers before any values
 * have been observed.
 * 
 * @returns Returns an `IPublishedObservable` that emits the last observed 
 * value to new subscribers.
 * 
 * @remarks If the subscription occurs after completion then the last
 * observed value is *not* emitted.
 */
function publish(initialValue) {
  var observable = this

  var result = new Subject(
    observer => observable[Subscribe](
      o => { 
        result[Value] = o
        observer[Next](o)
      },
      () => observer[Complete](),
      e => observer[Error](e)
    ),
    (next, completed) => {
      if (completed || is.undefined(result[Value]))
        return;
      next(result[Value])
    }
  )

  // initialize value
  result[Value] = initialValue

  return result
}

exportExtension(module, IObservable, publish)
