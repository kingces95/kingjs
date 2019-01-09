'use strict';
var is = require('@kingjs/is');

function normalizeAccessor(target, x, y, z) {
  var name, descriptor;

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.object(x))
    descriptor = { ...x };
  
  else if (!is.object(y)) {

    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    // e.g. 'foo', 'this.bar' => 'foo', { get: function() { return this.bar; } }
    if (is.stringOrSymbol(x)) {
      name = x;
      descriptor = { get: y, set: z }
    }

    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    else 
      descriptor = { get: x, set: y }
  }
 
  // e.g. 'foo', { get: function() { ... } }
  // e.g. 'foo', { get: 'this.bar' } => 'foo', { get: function() { ... } }
  else {
    var name = x;
    descriptor = { ...y };
  }  

  // normalize name
  if (!is.stringOrSymbol(name))
    name = (descriptor.get || descriptor.set).name;

  return { target, name, descriptor };
}

module.exports = normalizeAccessor;
