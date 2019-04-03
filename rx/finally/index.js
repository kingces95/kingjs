var { 
  ['@kingjs']: {
    rx: { Spy },
    reflect: { 
      exportExtension
    },
    IObservable
  }
} = require('./dependencies');

/**
 * @description Returns an `IObservable` that spies on the `complete` and `error` events.
 * 
 * @this any The source `IObservable` whose `complete` and `error` events are spied upon.
 * 
 * @param callback The callback to make when `complete` or `error` event occurs.
 * 
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `callback`.
 */
function $finally(callback) {
  return this[Spy](null, callback, () => callback);
}

exportExtension(module, IObservable, $finally);
