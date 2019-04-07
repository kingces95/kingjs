var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
  }
} = require('./dependencies');

var DefaultPredicate = () => true;

/**
 * @description Returns a promise that resolves with the value of
 * the next `next` emission or `complete` and rejects on `error`.
 * 
 * @this any The source `IObservable` whose emission resolves the promise.
 * 
 * @param predicate Ignore emissions that do no satisfy this predicate. 
 * 
 * @returns Returns a promise that that resolves with the value of
 * the next `next` emission or `complete` and rejects on `error`.
 * 
 * @remarks The promise will dispose its subscription upon receiving
 * the first `next` emission.
 */
function first(predicate = DefaultPredicate) {
  return new Promise((resolve, reject) => {
    var resolved;
    var dispose = this[Subscribe](o => {
      if (resolved)
        return;
      if (!predicate(o))
        return;
      process.nextTick(dispose);
      resolve(o);
    }, resolve, reject);
  });
}

exportExtension(module, IObservable, first);
