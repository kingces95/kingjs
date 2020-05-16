var { 
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IPublishedObservable: { Value },
    '-rx': { Subject },
    '-reflect': { is },
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

class PublishSubject extends Subject {
  constructor(
    value,
    activate,
    onSubscribe) {

    super(activate, onSubscribe)

    this[Value] = value
  }

  get value() { return this[Value] }
}

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

  return new PublishSubject(
    initialValue,
    observer => observable[Subscribe](
      o => { 
        observer[Value] = o
        observer[Next](o)
      },
      () => observer[Complete](),
      e => observer[Error](e)
    ),
    (self, next, completed) => {
      var value = self.value
      if (completed || is.undefined(value))
        return;
      next(value)
    }
  )
}

ExportExtension(module, IObservable, publish)
