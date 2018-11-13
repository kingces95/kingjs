'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var write = testRequire('@kingjs/descriptor.write');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

var myName = 'myName';

function readMe() {
  var result = map.call({
    inflateMe: function $(arg, key, path) { return arg; },
    squareMe: 3,
    scorchMe: { foo: undefined },
    writeMe: 'Hello World'  
  }, {
    inflate: { inflateMe: null },
    thunks: { squareMe: (value, arg, key) => value * value },
    scorch: { scorchMe: null },
    callback: (descriptor, arg) =>
      write.call(descriptor, 'writeMe', descriptor.writeMe + '!')
  }, 'myArg');

  assert(result.inflateMe == 'myArg');
  assert(result.squareMe == 9);
  assert('foo' in result.scorchMe == false);
  assert(result.writeMe == 'Hello World!');
  assert(isFrozen.call(result));
}
readMe();

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

function thunk(raw) {
  var action = function(value, name, key) {
    assert(value == 'fruit');
    assert(name == myName);
    assert(key == 'type');
    return 'food';
  };

  if (!raw)
    action = { thunks: { type: action } };

  var result = map.call(
    { type: 'fruit' }, 
    action,
    myName
  ); 

  assert(result.type == 'food');
}
thunk(false);
thunk(true);

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
    { }, {
      callback: function(descriptor, name) {
        descriptor = write.call(descriptor, 'name', name);
        return descriptor; 
      }, 
    },
    myName
  );

  assert(result.name == myName);
}
callback();
