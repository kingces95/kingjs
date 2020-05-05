var {
  ['@kingjs']: { 
    reflect: { is, descriptor: { rename } }
  }
} = require('./dependencies');

/**
 * @description Wraps strings found in a descriptor's `value`, `get` or `set`
 * into an appropriate corresponding lambda functions.
 * 
 * @this any The descriptor whose `value`, `get` or `set` property, if strings,
 * will be replaced with appropriate corresponding lambda functions. Only `set`
 * has arguments, a single parameter named `value`. 
 * 
 * @param [name] The name to assign any freshly created lambda functions.
 * 
 * @returns Returns `this` after it's strings are replaced with lambda functions.
 * 
 * @remarks A normal lambda uses the `this` from the surrounding lexical scope. 
 * These pseduo-lambda's use the `this` supplied at runtime. 
 */
function lambdize(name) {

  if (is.string(this.value))
    this.value = new Function('return ' + this.value);

  if (is.string(this.get))
    this.get = new Function('return ' + this.get);

  if (is.string(this.set))
    this.set = new Function('value', this.set);

  if (name)
    rename.call(this, name);

  return this;
}

module.exports = lambdize;