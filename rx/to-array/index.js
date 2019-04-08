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
 * @description Returns a promise that resolves with an array containing
 * emitted values before `complete` or rejects on `error`.
 * 
 * @this any The source `IObservable` whose emission are captured.
 * 
 * @returns Returns a promise that that resolves with the value of
 * the `next` emissions before `complete` and rejects on `error`.
 */
function toArray() {
  return new Promise((resolve, reject) => {
    var result = [];
    var dispose = this[Subscribe](
      o => result.push(o), 
      () => resolve(result), 
      reject
    );
  });
}

exportExtension(module, IObservable, toArray);
