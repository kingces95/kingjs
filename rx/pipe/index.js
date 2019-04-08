var { 
  ['@kingjs']: {
    rx: { 
      create, 
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
  }
} = require('./dependencies');

/**
 * @description Subscribes `subject` to the source `IObservable` and returns
 * the `subject`.
 * 
 * @this any The `IObservable` to which `subject` will be subscribed.
 * 
 * @param subject The subject to be subscribed to the source `IObservables`.
 * 
 * @returns Returns `subject`.
 */
function pipe(subject) {
  this[Subscribe](subject);
  return subject;
}

exportExtension(module, IObservable, pipe);
