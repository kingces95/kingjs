'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var myName = 'myName';

function inflate() {
  var result = map.call({
    name: function $(name, key, path) {
      assert(key == 'name');
      assert(name == myName);
      assert(path == 0);
      return name;
    }
   }, { 
     inflate: { '*': 0 }
   }, myName);

  assert(result.name == myName);
}
inflate();

function thunk() {
  var result = map.call({
    type: 'fruit'
  }, {
    thunks: {
      type: function(value, name, key) {
        assert(value == 'fruit');
        assert(name == myName);
        assert(key == 'type');
        return 'food';
      }
    }
  }, myName); 

  assert(result.type == 'food');
}
thunk();

function scorch() {
  var result = map.call({
    name: undefined
  }, { 
    scorch: { }
  }, myName); 

  assert('name' in result == false);

  var result = map.call({
    foo: { value: undefined }, 
    bar: { value: undefined },
    baz: undefined
  }, { 
    scorch: { foo: null } 
  }, myName); 

  assert('baz' in result == false);
  assert('value' in result.foo == false);
  assert('value' in result.bar == true);
}
scorch();

function callback() {

  var result = map.call(
    { }, 
    function(descriptor, name) {
      descriptor.name = name;
      return descriptor; 
    }, 
    myName
  );

  assert(result.name == myName);
}
callback();

function rawCallback() {

  var result = map.call(
    { }, { 
      callback: function(descriptor, name) {
        descriptor.name = name;
        return descriptor; 
      }
    },
    myName
  );

  assert(result.name == myName);
}
rawCallback();