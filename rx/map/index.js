var { 
  assert,
  ['@kingjs']: { rx: { Observable } }
} = require('./dependencies');

var Map = Symbol('@kingjs/rx.map');

/**
 * @description The description.
 * 
 * @this any `this` comment.
 * 
 * @param foo `foo` comment.
 * 
 * @returns Returns comment.
 */
function map(callback) {
  var observable = this;

  return new Observable(observer => {
    return observable.subscribe(o => observer.next(callback(o)));
  })
}

Observable.prototype[Map] = map;

module.exports = Map;