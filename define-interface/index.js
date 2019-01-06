//'use strict';
module.requirePackages = require('@kingjs/require-packages');

var assert = require('assert');
var {
  '@kingjs/has-instance': hasInstance,
} = module.requirePackages();

var { 
  Identity,
  Polymorphisms,
} = hasInstance;

var IIdentifiableIdentity = Symbol.for('@kingjs/IIdentifiable');
var IPolymorphicIdentity = Symbol.for('@kingjs/IPolymorphic');
var IInterfaceIdentity = Symbol.for('@kingjs/IInterface');

var Delimiter = '.';
var Empty = Object.create(null);

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

IIdentifiable[Identity] = IIdentifiableIdentity;
IPolymorphic[Identity] = IPolymorphicIdentity;
IInterface[Identity] = IInterfaceIdentity;

IIdentifiable.prototype = null;
IPolymorphic.prototype = null;
IInterface.prototype = null;

Object.defineProperty(IIdentifiable, Symbol.hasInstance, { value: hasInstance });
Object.defineProperty(IPolymorphic, Symbol.hasInstance, { value: hasInstance });
Object.defineProperty(IInterface, Symbol.hasInstance, { value: hasInstance });

IIdentifiable.constructor = IInterface;
IPolymorphic.constructor = IInterface;
IInterface.constructor = IInterface;

IInterface[Polymorphisms] = { 
  [IIdentifiableIdentity]: IIdentifiable,
  [IPolymorphicIdentity]: IPolymorphic,
  [IInterfaceIdentity]: IInterface,
}

IIdentifiable.Identity = Identity;
IPolymorphic.Polymorphisms = Polymorphisms;

assert(IIdentifiable instanceof IInterface);
assert(IIdentifiable instanceof IIdentifiable);
assert(IIdentifiable instanceof IPolymorphic);

assert(IPolymorphic instanceof IInterface);
assert(IPolymorphic instanceof IIdentifiable);
assert(IPolymorphic instanceof IPolymorphic);

assert(IInterface instanceof IInterface);
assert(IInterface instanceof IIdentifiable);
assert(IInterface instanceof IPolymorphic);

function defineInterface(target, name, descriptor) {

  if (!descriptor)
    descriptor = Empty;

  // throws if activated
  var interface = function() {
    assert(false, interfaceActivationError)
  };

  // remove prototype (because it's never activated)
  interface.prototype = null;

  // identify
  var id = (descriptor.id || Symbol.for(name));
  assert(Symbol.keyFor(id));
  assert(Identity in interface == false);
  interface[Identity] = id;

  // name
  var symbolName = Symbol.keyFor(id);
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: symbolName,
  });

  // so @kingjs/hasInstance considers this an instance implementing IInterface
  interface.constructor = IInterface;

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

    for (var extension of extensions) {

      // add extension
      addPolymorphism.call(interface, extension);

      // inherit extensions polymorphisms
      var inheritedPolymorphisms = extension[Polymorphisms];
      if (inheritedPolymorphisms) {
        for (var symbol of Object.getOwnPropertySymbols(inheritedPolymorphisms))
          addPolymorphism.call(interface, inheritedPolymorphisms[symbol]);
      }
    }
  }

  return target[name] = interface;
}

defineInterface.IIdentifiable = IIdentifiable;
defineInterface.IPolymorphic = IPolymorphic;
defineInterface.IInterface = IInterface;

defineInterface.addPolymorphism = addPolymorphism;

module.exports = defineInterface;