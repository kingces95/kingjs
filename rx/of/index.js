var { 
  assert,
  ['@kingjs']: { rx: { Observable } }
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
      observer.next(o);
  });
}

module.exports = of;