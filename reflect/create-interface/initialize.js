var assert = require('assert');
var hasInstance = require('./has-instance');

var {
  ['@kingjs']: {
    reflect: { builtInSymbols }
  },
} = require('./dependencies');

var Id = Symbol.for('@kingjs/IInterface.id');

// reconfigure a Function to be an interface
function initialize(id) {
  assert(typeof this == 'function');

  // construct name
  assert(id);
  if (typeof id == 'string')
    id = Symbol.for(id);
  var name = Symbol.keyFor(id);
  assert(name || id in builtInSymbols)

  // interface name is the keyFor its symbolic id
  Object.defineProperty(this, 'name', {
    enumerable: true,
    value: name
  });

  // remove prototype & ctor (because it's never activated)
  this.prototype = null;
  this.constructor = null;

  // assign id
  assert(Id in this == false);

  // the function is, itself, an instance of an interface 
  this[Id] = id;

  // support instanceof
  Object.defineProperty(this, Symbol.hasInstance, {
    value: hasInstance
  });

  return name;
}

module.exports = initialize;