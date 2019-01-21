var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { initialize: { name: initializeName } } 
  }
} = require('./dependencies');

/**
 * @this any The descriptor whose strings will become lambda functions.
 * @param name The name of the lambda functions.
 * @returns The descriptor whose strings are replaced with lambda functions.
 */
function lambda(name) {

  if (is.string(this.value))
    this.value = new Function('return ' + this.value);

  if (is.string(this.get))
    this.get = new Function('return ' + this.get);

  if (is.string(this.set))
    this.set = new Function('value', this.set);

  initializeName.call(this, name);

  return this;
}

module.exports = lambda;