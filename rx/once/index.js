var { 
  ['@kingjs']: {
    rx: { create },
  }
} = require('./dependencies');

/**
 * @description Filter values by those followed without
 * emissions for `duration` milliseconds.
 * 
 * @this any `this` The observable whose values will be filtered.
 * 
 * @param foo `duration` The time in milliseconds an emission must
 * be followed by no additional emission to pass through this filter.
 * 
 * @returns Returns an observable whose values are filtered by
 * emissions followed by no emissions for `duration` milliseconds.
 */
function once(interval, value) {
  return create(interval, next => next(value));
}

module.exports = once;
