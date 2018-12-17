'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function thunk(name) {
  assert(is.stringOrSymbol(name));

  if (this.function)
    return functionThunk.call(this, name);

  return accessorThunk.call(this, name);
}

function functionThunk(name) {
  assert(this.function);

  this.value = function() {
    return this[name].apply(this, arguments); 
  };
  nameThunk(this.value, name);

  return this;
}

function accessorThunk(name) {
  assert(!this.function);

  delete this.value;
  delete this.writable;

  this.get = function() {
    return this[name]; 
  };
  nameThunk(this.get, name);

  this.set = function(value) {
    this[name] = value; 
  }
  nameThunk(this.set, name);

  return this;
}

function nameThunk(func, name) {
  if (is.symbol(name))
    name = name.toString();
  Object.defineProperty(func, 'name', { value: `${name}_Thunk` });
}

Object.defineProperties(module, {
  exports: { value: thunk }
});