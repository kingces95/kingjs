var assert = require('assert');
var Id = Symbol.for('@kingjs/IInterface.id');

// intercept instanceof; used by extension stubs to test type
function hasInstance(instance) {
  var type = typeof instance;
  if (type != 'object' && type != 'string' && type != 'function')
    return false;

  if (type == 'string')
    instance = String.prototype;

  assert(Id in this);
  var id = this[Id];
  return id in instance;
}

module.exports = hasInstance;