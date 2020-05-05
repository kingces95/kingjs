var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    rx: {
      IObservable,
      IObservable: { Subscribe },
    }
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
 * @remarks The subscription used by the promise to resolve upon
 * a `next` emission also schedules a disposal of the subscription.
 */
function toPromise() {
  return new Promise((resolve, reject) => {
    var dispose = this[Subscribe](o => {
      process.nextTick(dispose);
      resolve(o);
    }, resolve, reject);
  });
}

exportExtension(module, IObservable, toPromise);
