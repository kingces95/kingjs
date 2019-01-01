'use strict';

var identityId = require('@kingjs/identity');
var polymorphismsId = require('@kingjs/polymorphisms');

function hasInstance(instance) {
  var type = typeof instance;
  if (type != 'object' && type != 'string' && type != 'function')
    return false;

  var constructor = instance.constructor;
  if (!constructor || typeof constructor != 'function')
    return false;

  var polymorphisms = constructor[polymorphismsId];
  if (!polymorphisms)
    return false;

  var id = this[identityId];
  return id in polymorphisms;
}

module.exports = hasInstance;