var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
  }
} = require('./dependencies');

/**
 * @description Returns a promise that resolves with the value of
 * the next `next` emission or `complete` and rejects on `error`.
 * 
 * @this any The source `IObservable` whose emission resolves the promise.
 * 
 * @returns Returns a promise that that resolves with the value of
 * the next `next` emission or `complete` and rejects on `error`.
 * 
 * @remarks The promise will dispose its subscription upon receiving
 * the first `next` emission.
 */
function first() {
  return new Promise((resolve, reject) => {
    var resolved;
    var dispose = this[Subscribe](o => {
      if (resolved)
        return;
      resolve(o);
    }, resolve, reject);
  });
}

exportExtension(module, IObservable, first);
