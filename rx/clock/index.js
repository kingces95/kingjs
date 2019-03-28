var {
  ['@kingjs']: {
    endless,
    reflect: { is },
    promise: { sleep },
    rx: { Subject },
    IObserver: { Next, Complete, Error },
  },
} = require('./dependencies');

/**
 * @description Create an `IObservable` that asynchronously emits values.
 * 
 * @param {*} callback Invoked when a value is scheduled to be emitted.
 * @param {*} [timeOut] A function that returns the time to wait in milliseconds
 * before the next emission. 
 * 
 * @returns A function which can be called to cancel the emission of values.
 * 
 * @callback
 * @param this A context that is preserved between callbacks.
 * @param next A function called with the value to emit.
 * @returns Returns`true` if more values are available for emission, else 'false'. 
 * 
 * @remarks - Both `callback` may return promises.
 * @remarks - At most one value is emitted per event loop.
 * @remarks - The first emission happens 
 * @remarks -- after the timeOut has elapsed. 
 * @remarks -- on the next tick at the earliest.
 * @remarks - The observable automatically emits `complete` when the `callback` returns false.
 * @remarks - The observable automatically emits `error` with any exception thrown from `callback`.
 * 
 * @remarks - If `callback` is a generator (or an async generator) then
 * @remarks -- the next value to emit is pulled from the generator
 * @remarks -- emission stops when the generator is exhausted (or throws).
 */
function create(callback, timeOut = endless(0)) {
 
  if (is.generator(callback) || is.asyncGenerator(callback))
    return fromGenerator(callback, timeOut);

  return new Subject(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      var self = { };
      var intervalIterable;

      try {
        var next = observer[Next].bind(observer);

        while (true) {

          // inject timeOut
          var nextInterval = timeOut();
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
    });

    return () => cancelled = true;
  });
}

function fromGenerator(callback, timeOut) {
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
  }, timeOut);
}

module.exports = create;