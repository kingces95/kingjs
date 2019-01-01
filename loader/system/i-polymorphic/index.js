//'use strict';

var identityId = require('../../runtime/identity');

// declare
function IPolymorphic() {
  throw 'Cannot activate interface.';
}
IPolymorphic.prototype = null;

// add member 'polymorphisms'
IPolymorphic.polymorphisms = Symbol('@kingjs/IPolymorphic.polymorphisms');

// identify
var id = IPolymorphic[identityId] = Symbol('@kingjs/IPolymorphic');

// implement IPolymorphic
var { polymorphisms } = IPolymorphic;
IPolymorphic[polymorphisms] = Object.create(null);
IPolymorphic[polymorphisms][id] = IPolymorphic;

// hasInstance extension
IPolymorphic.hasInstance = function(instance) {
  if (!instance || typeof instance != 'object')
    return false;

  var constructor = instance.constructor;
  if (!constructor || typeof constructor != 'object')
    return false;

  var polymorphisms = constructor[polymorphismsId];
  if (!polymorphisms)
    return false;

  var id = this[identityId];
  return id in polymorphisms;
}

module.exports = IPolymorphic;