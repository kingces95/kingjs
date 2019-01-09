'use strict';
var assert = require('assert');

var is = require('@kingjs/is');
var initStub = require('./stub');

function initializeThunk(name) {
  assert(is.stringOrSymbol(name));

  if (this.function)
    return functionThunk.call(this, name);

  else 
    return accessorThunk.call(this, name);
}

function functionThunk(name) {
  assert(this.function);

  this.value = function thunk() {
    return this[name].apply(this, arguments); 
  };
  initStub.call(this.value, name);
}

function accessorThunk(name) {
  assert(!this.function);

  delete this.value;
  delete this.writable;

  this.get = function getThunk() {
    return this[name]; 
  };
  initStub.call(this.get, name);

  this.set = function setThunk(value) {
    this[name] = value; 
  }
  initStub.call(this.set, name);
}

module.exports = initializeThunk;