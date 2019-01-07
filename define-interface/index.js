//'use strict';
var assert = require('assert');

// interface should throw when activated
var ActivationError = 'Cannot activate interface.';
var Delimiter = '.';
var Empty = Object.create(null);
var BuiltInSymbols = { };

// gather builtin symbols; interface member ids are global or builtin
for (var name of Object.getOwnPropertyNames(Symbol)) {
  var value = Symbol[name];
  if (typeof value != 'symbol')
    continue;
  BuiltInSymbols[value] = name;
}

var InterfaceId = Symbol.for('@kingjs/IInterface.Id');

// intercept instanceof; used by extension stubs to test type
function hasInstance(instance) {
  var type = typeof instance;
  if (type != 'object' && type != 'string' && type != 'function')
    return false;

  if (type == 'string')
    instance = String.prototype;

  assert(InterfaceId in this);
  var id = this[InterfaceId];
  return id in instance;
}

// reconfigure a Function to be an interface
function initialize(id) {
  assert(typeof this == 'function');

  // construct name
  assert(id);
  if (typeof id == 'string')
    id = Symbol.for(id);
  var name = Symbol.keyFor(id);
  assert(name);

  // assign name
  assert(InterfaceId in this == false);
  this[InterfaceId] = id;

  // remove prototype (because it's never activated)
  this.prototype = null;

  // the function is, itself, an instance of an interface 
  this.constructor = IInterface;
  this[IInterface[InterfaceId]] = IInterface;

  // support instanceof
  Object.defineProperty(this, Symbol.hasInstance, {
    value: hasInstance
  });

  return name;
}

// IInterface
var IInterface = function() { assert(false, ActivationError); }
initialize.call(IInterface, '@kingjs/IInterface');
IInterface.Id = InterfaceId;

function defineInterface(target, name, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  // throws if activated
  var interface = function() {
    assert(false, ActivationError)
  };

  // rename
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: name
  });

  var symbolName = initialize.call(interface, descriptor.id);


  // descriptor.members; for each member, assign or create a symbol 
  for (var member in descriptor.members) {
    memberId = descriptor.members[member];

    if (memberId === null)
      memberId = Symbol.for(symbolName + Delimiter + member);

    // member symbol must be global (or builtin)
    assert(Symbol.keyFor(memberId) || memberId in BuiltInSymbols);
    interface[member] = memberId;
  }

  // descriptor.extensions; save/inherit extensions
  var extensions = descriptor.extends;
  if (extensions) {

    for (var extension of extensions) {

      // extensions must be interfaces
      assert(extension.constructor == IInterface);
      interface[extension[InterfaceId]] = extension;

      // inherit extensions polymorphisms
      for (var symbol of Object.getOwnPropertySymbols(extension)) {
        var inheritedExtension = extension[symbol];
        if (inheritedExtension.constructor != IInterface);
          continue;

        assert(inheritedExtension[InterfaceId] == symbol);
        interface[symbol] = inheritedExtension;
      }
    }
  }

  return target[name] = interface;
}

defineInterface.IInterface = IInterface;
module.exports = defineInterface;