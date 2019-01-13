var {
  '@kingjs/define-property.initialize-name': initializeName,
} = require('@kingjs/require-packages').call(module);

/**
 * 
 * @param {any} target 
 * @param {string} name 
 */
function initializeBind(target, name) {

  if (this.function)
    this.value = this.value.bind(target);
  
  if (this.get)
    this.get = this.get.bind(target);
  
  if (this.set)
    this.set = this.set.bind(target);

  initializeName.call(this, name, 'bound');
}

initializeBind(true, '');

module.exports = initializeBind;