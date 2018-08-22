'use strict';

var transform = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function wrapDeclarative() {
  var result = transform.call('apple', undefined, { wrap: 'name' });
  assert(result.name == 'apple');  
}
wrapDeclarative();

function wrapProcedural() {
  var result = transform.call('apple', undefined, {
    wrap: function() {
      return { name: this };
    }
  });
  assert(result.name == 'apple');  
}
wrapProcedural();

function shallowCopy() {
  var apple = {
    name: 'apple',
  };

  var result = transform.call(apple);

  assert(result != apple);
  assert(result.name == 'apple');
}
shallowCopy();

function inherit() {
  var result = transform.call({ }, '$fruit', {
    bases: {
      fruit: { type: 'fruit' }  
    }
  });

  assert(result.type == 'fruit');
}
inherit();

function defaults() {
  var result = transform.call({ }, undefined, {
    defaults: {
      type: 'fruit'
    }
  });

  assert(result.type == 'fruit');
}
defaults();

function inflate() {
  var result = transform.call({
    name: function $(name, key) {
      assert(key == 'name');
      return name;
    }
   }, 'apple');

  assert(result.name == 'apple');
}
inflate();

function thunk() {
  var result = transform.call({
    type: 'fruit'
  }, 'apple', {
    thunks: {
      type: function(name, key) {
        assert(this == 'fruit');
        assert(name == 'apple');
        assert(key == 'type');
        return 'food';
      }
    }
  }); 

  assert(result.type == 'food');
}
thunk();

function scorch() {
  var result = transform.call({
    name: undefined
  }); 

  assert('name' in result == false);
}
scorch();

function callback() {

  var result = transform.call(
    { }, 'apple', function(name) {
      this.name = name;
      return this; 
    }
  );

  assert(result.name == 'apple');
}
callback();
