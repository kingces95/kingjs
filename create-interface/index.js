//'use strict';

var assert = require('assert');
var identityId = require('@kingjs/identity');
var polymorphismsId = require('@kingjs/polymorphisms');
var hasInstance = require('@kingjs/has-instance');

var empty = Object.create(null);

var interfaceActivationError = 'Cannot activate interface.';

function createInterface(name, descriptor) {

  if (!descriptor)
    descriptor = empty;

  // throws if activated
  var interface = function() {
    assert(false, interfaceActivationError)
  };

  // name
  Object.defineProperty(interface, 'name', {
    enumerable: true,
    value: name,
  });

  // identify
  var id = interface[identityId] = Symbol.for(name);

  // remove prototype (because it's never activated)
  interface.prototype = null;

  // for each member, assign or create a symbol 
  if (descriptor.members) {

    for (var member in descriptor.members) {
      memberId = descriptor.members[member];

      if (!memberId)
        memberId = Symbol.for(`${name}.${member}`);

      interface[member] = memberId;
    }
  }

  // activate polymorphisms
  var polymorphisms = interface[polymorphismsId] = Object.create(null);
  polymorphisms[id] = interface;

  // save/inherit extensions
  var extensions = descriptor.extends;
  if (extensions) {

    // inherited
    for (var extension of extensions) {
      var inheritedPolymorphisms = extension[polymorphismsId];
      
      for (var id of Object.getOwnPropertySymbols(inheritedPolymorphisms))
        polymorphisms[id] = inheritedPolymorphisms[id];
    }
  }

  // support instanceOf
  Object.defineProperty(interface, Symbol.hasInstance, { 
    value: hasInstance
  });

  return interface;
}

module.exports = createInterface;