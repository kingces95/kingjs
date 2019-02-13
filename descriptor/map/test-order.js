'use strict';

var map = require('.');

var assert = require('assert');
var write = require('@kingjs/descriptor.write');

function inflateThenThunks() {
  
  var result = map({ 
    apple: {
      name: function $(name) {  
        return name;
      }
    },
  }, {
    inflate: { '*': null },
    thunks: {
      name: function(name, value, key) {
        return String.prototype.toUpperCase.call(value);
      }
    },
  });

  assert(result.apple.name == 'APPLE'); // inflate -> thunks
}
inflateThenThunks();

function thunksThenScorch() {
  
  var result = map({
    foo: { name: 'apple' }
  },  {
    scorch: { },
    thunks: {
      name: function(name, value, key) {
        return undefined;
      }
    },
  });

  assert(`name` in result.foo == false); // thunks -> scorch
}
thunksThenScorch();

function scorchThenCallback() {
  
  var result = map({
    myName: {
      foo: 0,
      name: undefined
    }
  },  {
    scorch: { },
    callback: function(value, name) {
      assert(value.foo == 0);
      assert(name == 'myName');
      assert('name' in value == false);
      return write.call(value, 'name', 'apple');
    }
  });

  assert(result.myName.name == 'apple'); // scorch then callback
}
scorchThenCallback();