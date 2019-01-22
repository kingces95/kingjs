var {
  ['@kingjs']: { propertyDescriptor: { initialize: { name: initializeName } } }
} = require('./dependencies');

/**
 * @this any The descriptor whose functions will be bound.
 * @param target The target to bind to each function in the descriptor.
 * @param name The name to assign to the bound functions.
 * @returns Returns the descriptor with its functions bound to the target.
 */
function bind(target, name) {

  if (this.value)
    this.value = this.value.bind(target);
  
  if (this.get)
    this.get = this.get.bind(target);
  
  if (this.set)
    this.set = this.set.bind(target);

  initializeName.call(this, name, 'bound');

  return this;
}

module.exports = bind;