//'use strict';
module.requirePackages = require('@kingjs/require-packages');

var assert = require('assert');
var {
  '@kingjs/has-instance': hasInstance,
} = module.requirePackages();

var Delimiter = '.';
var Empty = Object.create(null);
var Identity = Symbol.for('@kingjs/identity');
var Polymorphisms = Symbol.for('@kingjs/polymorphisms');

var interfaceActivationError = 'Cannot activate interface.';

var BuiltInSymbols = { };
for (var name of Object.getOwnPropertyNames(Symbol)) {
  var value = Symbol[name];
  if (typeof value != 'symbol')
    continue;
  BuiltInSymbols[value] = name;
}

function defineInterface(target, name, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  // throws if activated
  var interface = function() {
    assert(false, interfaceActivationError)
  };

  // identify
  var id = interface[Identity] = (descriptor.id || Symbol.for(name));
  assert(Symbol.keyFor(id));

  // name
  var symbolName = Symbol.keyFor(id);
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: symbolName,
  });

  // remove prototype (because it's never activated)
  interface.prototype = null;

  // for each member, assign or create a symbol 
  for (var member in descriptor.members) {
    memberId = descriptor.members[member];

    if (memberId === null)
      memberId = Symbol.for(symbolName + Delimiter + member);

    assert(Symbol.keyFor(memberId) || memberId in BuiltInSymbols);
    interface[member] = memberId;
  }

  // activate polymorphisms
  var polymorphisms = interface[Polymorphisms] = Object.create(null);
  polymorphisms[id] = interface;

  // save/inherit extensions
  var extensions = descriptor.extends;
  if (extensions) {

    // inherited
    for (var extension of extensions) {
      var inheritedPolymorphisms = extension[Polymorphisms];
      
      for (var symbol of Object.getOwnPropertySymbols(inheritedPolymorphisms))
        polymorphisms[symbol] = inheritedPolymorphisms[symbol];
    }
  }

  // support instanceOf
  Object.defineProperty(interface, Symbol.hasInstance, { 
    value: hasInstance
  });

  return target[name] = interface;
}

module.exports = defineInterface;