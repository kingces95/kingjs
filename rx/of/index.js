var { 
  ['@kingjs']: {
    rx: { create },
    linq: { ToObservable },
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
  return [...arguments][ToObservable]();
}

module.exports = of;