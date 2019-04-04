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
 * @description Returns an `IObservable` that spies on the `complete` event.
 * 
 * @this any The source `IObservable` whose `complete` event is spied upon.
 * 
 * @param callback The callback to make when `complete` event occurs.
 * 
 * @returns Returns a new `IObservable` that behaves like the source
 * `IObservable` modulo any side effects introduced by `callback`.
 */
function encore(callback) {
  return this[Spy](null, callback, null);
}

exportExtension(module, IObservable, encore);
