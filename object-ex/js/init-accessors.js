'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');
var initLambdas = require('./init-lambdas');

function initAccessor(x, y, z) {
  assert('configurable' in this);
  assert('enumerable' in this);
  
  var get, set;

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.objectLiteral(x)) {
    get = x.get;
    set = x.set;
  }
  
  else if (!is.objectLiteral(y)) {
    
    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    // e.g. 'foo', 'this.bar' => 'foo', { get: function() { return this.bar; } }
    if (is.stringOrSymbol(x)) {
      get = y;
      set = z;
    }

    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    else {
      get = x;
      set = y;
    } 
  }
 
  // e.g. 'foo', { get: function() { ... } }
  // e.g. 'foo', { get: 'this.bar' } => 'foo', { get: function() { ... } }
  else {
    get = y.get;
    set = y.set;
  }
    
  if (get) 
    this.get = get;

  if (set) 
    this.set = set;

  return initLambdas.call(this);        
}

Object.defineProperties(module, {
  exports: { value: initAccessor }
});