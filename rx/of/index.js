var { 
  assert,
  ['@kingjs']: {
    rx: { Observable },
    IObserver: { Next, Complete }
  }
} = require('./dependencies');

/**
 * @description The description.
 * 
 * @this any `this` comment.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
function of() {
  return new Observable(observer => {
    for (o of arguments)
      observer[Next](o);
    observer[Complete]();
  });
}

module.exports = of;