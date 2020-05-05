var { 
  assert,
  ['@kingjs']: {
    rx: { 
      create,
      IObserver: { Error },
    },
  }
} = require('./dependencies');

/**
 * @description Create an `IObservable` that emits an error.
 * 
 * @param value The error to emit.
 * 
 * @returns Returns `IObservable` that emits an error.
 */
function fail(value) {
  return create(function(observer) {
    observer[Error](value);
  });
}

module.exports = fail;