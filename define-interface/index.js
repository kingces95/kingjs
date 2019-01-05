//'use strict';
module.requirePackages = require('@kingjs/require-packages');

var assert = require('assert');
var {
  '@kingjs/has-instance': hasInstance,
} = module.requirePackages();

var Delimiter = '.';
var Empty = Object.create(null);

var IIdentifiableIdentity = Symbol.for('@kingjs/IIdentifiable');
var IPolymorphicIdentity = Symbol.for('@kingjs/IPolymorphic');
var IInterfaceIdentity = Symbol.for('@kingjs/IInterface');

var Identity = Symbol.for('@kingjs/Identity');
var Polymorphisms = Symbol.for('@kingjs/Polymorphisms');

var interfaceActivationError = 'Cannot activate interface.';
var BuiltInSymbols = { };

for (var name of Object.getOwnPropertyNames(Symbol)) {
  var value = Symbol[name];
  if (typeof value != 'symbol')
    continue;
  BuiltInSymbols[value] = name;
}

var IIdentifiable = function() { assert(false, interfaceActivationError); }
var IPolymorphic = function() { assert(false, interfaceActivationError); }
var IInterface = function() { assert(false, interfaceActivationError); }

function defineInterface(target, name, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  // throws if activated
  var interface = descriptor.func || function() {
    assert(false, interfaceActivationError)
  };

  // remove prototype (because it's never activated)
  interface.prototype = null;

  // so @kingjs/hasInstance considers this an instance implementing IInterface
  interface.constructor = IInterface;

  // identify
  var id = (descriptor.id || Symbol.for(name));
  interface[Identity] = id;
  assert(Symbol.keyFor(id));

  // name
  var symbolName = Symbol.keyFor(id);
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: symbolName,
  });

  // activate polymorphisms
  interface[Polymorphisms] = Object.create(null);

  // implement IIdentifiable, IPolymorphic
  interface[Polymorphisms][IIdentifiableIdentity] = IIdentifiable;
  interface[Polymorphisms][IPolymorphicIdentity] = IPolymorphic;
  interface[Polymorphisms][IInterfaceIdentity] = IInterface;

  // support instanceOf
  Object.defineProperty(interface, Symbol.hasInstance, { 
    value: hasInstance
  });

  // for each member, assign or create a symbol 
  for (var member in descriptor.members) {
    memberId = descriptor.members[member];

    if (memberId === null)
      memberId = Symbol.for(symbolName + Delimiter + member);

    assert(Symbol.keyFor(memberId) || memberId in BuiltInSymbols);
    interface[member] = memberId;
  }

  // save/inherit extensions
  var extensions = descriptor.extends;
  if (extensions) {

    // inherited
    for (var extension of extensions) {
      var inheritedPolymorphisms = extension[Polymorphisms];
      
      for (var symbol of Object.getOwnPropertySymbols(inheritedPolymorphisms))
        interface[Polymorphisms][symbol] = inheritedPolymorphisms[symbol];
    }
  }

  return target[name] = interface;
}

defineInterface(defineInterface, 'IIdentifiable', { 
  func: IIdentifiable,
  id: IIdentifiableIdentity,
  members: { Identity: Identity },
});

defineInterface(defineInterface, 'IPolymorphic', { 
  func: IPolymorphic,
  id: IPolymorphicIdentity,
  members: { Polymorphisms: Polymorphisms },
  extends: [ IIdentifiable ],
});

defineInterface(defineInterface, 'IInterface', { 
  func: IInterface,
  id: IInterfaceIdentity,
  extends: [ IPolymorphic ],
});

assert(IIdentifiable instanceof IInterface);
assert(IIdentifiable instanceof IIdentifiable);
assert(IIdentifiable instanceof IPolymorphic);

assert(IPolymorphic instanceof IInterface);
assert(IPolymorphic instanceof IIdentifiable);
assert(IPolymorphic instanceof IPolymorphic);

assert(IInterface instanceof IInterface);
assert(IInterface instanceof IIdentifiable);
assert(IInterface instanceof IPolymorphic);

module.exports = defineInterface;