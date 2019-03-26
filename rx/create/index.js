var {
  assert,
  ['@kingjs']: { 
    reflect: { is },
    promise: { sleep },
    rx: { Subject },
    IObserver: { Next, Complete, Error },
  },
} = require('./dependencies');

/**
 * @description Create an `IObservable` that, once per tick per `interval`,
 * invokes `callback` with a `next` function to call with the next value to emit.
 * 
 * @param {*} callback Invoked when a value is scheduled to be emitted.
 * @param {*} [interval] The time between emissions, or a function or 
 * generator that returns the time until the next emission.
 * 
 * @returns A function which can be called to cancel the emission of values.
 * 
 * @callback
 * @param this A context that is preserved between callbacks.
 * @param next A function called with the next value to emit.
 * @returns A boolean promise of `false` if values have been exhausted or `true`
 * if more values are available. 
 * 
 * @remarks - The `callback` may be an `async` function.
 * @remarks - The first emission happens after an interval
 * has elapsed and on the next tick at the earliest.
 * @remarks - The observable automatically emits 
 * `complete` when the `callback` returns false.
 * @remarks - The observable automatically emits 
 * `error` with any exception thrown from `callback`.
 * @remarks - Values emitted after a generator `interval` has been
 * exhausted will be emitted once per tick.
 * @remarks - `callback` may be a generator or an async generator in which
 * case value to emit are pulled from the generator on a schedule specified
 * by `interval` until the generator is exhausted or throws an exception.
 */
function create(callback, interval = 0) {

  if (is.generator(callback) || is.asyncGenerator(callback))
    return fromGenerator(callback, interval);

  return new Subject(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      var self = { };
      var intervalIterable;

      try {
        var next = observer[Next].bind(observer);

        while (true) {

          // inject delay
          var nextInterval = await getNextInterval();
          await sleep(nextInterval);

          // externally terminated
          if (cancelled)
            return;

          // yield value
          if (await callback.call(self, next) == false) {

            // self terminated
            observer[Complete]();
            break;
          }
        }
      } catch(e) { 
        observer[Error](e);
      }
      
      async function getNextInterval() {
        if (is.number(interval))
          return interval;

        if (is.generator(interval) || is.asyncGenerator(interval)) {
          if (!intervalIterable)
            intervalIterable = interval();
        }
        else if (is.function(interval))
          return await interval();

        if (!intervalIterable && Symbol.iterator in interval)
          intervalIterable = interval[Symbol.iterator]();

        var next = await intervalIterable.next();
        if (next.done)
          return interval = 0;

        return next.value;
      }
    });

    return () => cancelled = true;
  });
}

function fromGenerator() {
  var generator = callback;

  return create(async function(next) {
    var iterator = this.iterator;

    if (!iterator)
      iterator = this.iterator = generator();

    var current = await iterator.next();
    if (current.done)
      return false;

    next(current.value);
    return true;
  }, interval);
}

module.exports = create;