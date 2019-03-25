var { 
  ['@kingjs']: { 
    linq: { 
      range: linqRange,
      ToObservable
    }
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
function range(start, count) {
  return linqRange(start, count)[ToObservable]()
}

module.exports = range;