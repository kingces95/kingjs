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
 */
function toPromise() {
  return new Promise((resolve, reject) => {
    this[Subscribe](resolve, resolve, reject);
  });
}

exportExtension(module, IObservable, toPromise);
