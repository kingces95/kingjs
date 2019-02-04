var assert = require('assert');
var hasInstance = require('./has-instance');

var {
  ['@kingjs']: {
    builtInSymbols
  },
} = require('./dependencies');

var Id = Symbol.for('@kingjs/IInterface.id');
var IInterfaceId = '@kingjs/IInterface';

// reconfigure a Function to be an interface
function initialize(id) {
  assert(typeof this == 'function');

  // construct name
  assert(id);
  if (typeof id == 'string')
    id = Symbol.for(id);
  var name = Symbol.keyFor(id);
  assert(name || id in builtInSymbols)

  // remove prototype (because it's never activated)
  this.prototype = null;

  // assign id
  assert(Id in this == false);
  this[Id] = id;

  // the function is, itself, an instance of an interface 
  this.constructor = IInterface;
  this[IInterface[Id]] = IInterface;

  // support instanceof
  Object.defineProperty(this, Symbol.hasInstance, {
    value: hasInstance
  });

  return name;
}

// IInterface
var IInterface = function() { assert(false, ActivationError); }
initialize.call(IInterface, IInterfaceId);
IInterface.id = Id; 
IInterface.Id = Id;

initialize.IInterface = IInterface;
module.exports = initialize;