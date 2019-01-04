'use strict';

var Identity = Symbol.for('@kingjs/IIdentifiable.Identity');
var Polymorphisms = Symbol.for('@kingjs/IPolymorphic.Polymorphisms');

function hasInstance(instance) {
  var type = typeof instance;
  if (type != 'object' && type != 'string' && type != 'function')
    return false;

  var constructor = instance.constructor;
  if (!constructor || typeof constructor != 'function')
    return false;

  var polymorphisms = constructor[Polymorphisms];
  if (!polymorphisms)
    return false;

  var id = this[Identity];
  return id in polymorphisms;
}

module.exports = hasInstance;