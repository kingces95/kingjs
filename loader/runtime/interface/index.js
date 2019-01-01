//'use strict';

var identityId = require('../identity');
var { polymorphisms: polymorphismsId, hasInstance } = require('../../system/IPolymorphic');
var extensionsId = Symbol('@kingjs/Interface.extensions');

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
  var id = interface[identityId] = Symbol(name);

  // remove prototype (because it's never activated)
  interface.prototype = null;

  // for each member, create a symbol 
  if (descriptor.members) {
    for (var member in descriptor.members)
      interface[member] = Symbol(`${name}.${member}`);
  }

  // activate polymorphisms
  var polymorphisms = interface[polymorphismsId] = Object.create(null);
  polymorphisms[id] = interface;

  // save/inherit extensions
  var extensions = descriptor.extensions;
  if (extensions) {

    // save
    interface[extensionsId] = Array.prototype.slice.call(Array, extensions);

    // inherited
    for (var extension of extensions) {
      var inheritedPolymorphisms = extension[polymorphismsId];
      
      for (var id of Object.getOwnPropertySymbols(inheritedPolymorphisms))
        polymorphisms[id] = inheritedPolymorphisms[id];
    }
  }

  // support instanceOf
  interface[Symbol.hasInstance] = hasInstance;

  return interface;
}

module.exports = {
  interfaceId,
  extensionsId,
  createInterface,
}