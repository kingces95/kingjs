'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var write = testRequire('@kingjs/descriptor.write');

function wrapThenInherit() {
  
  var result = create({ 
    foo$fruit: 'apple',
  }, {
    wrap: 'name',
    basePoset: { 
      fruit: { 
        type: 'fruit',
        name: 'unknown',
      }
    }
  });

  assert(result.foo.name == 'apple'); // wrap, inherit
  assert(result.foo.type == 'fruit'); // inherit
}
wrapThenInherit();

function inheritThenDefaults() {
  
  var result = create({ 
    foo$fruit: { },
  }, {
    defaults: { 
      type: 'unknown',
      color: 'unknown' 
    },
    basePoset: { 
      fruit: { 
        type: 'fruit',
        name: 'unknown',
      }
    }
  });

  assert(result.foo.type == 'fruit'); // inherit
  assert(result.foo.color == 'unknown'); // defaults
}
inheritThenDefaults();

function defaultsThenInflate() {
  
  var result = create({ 
    foo: { },
  }, {
    inflate: { '*': null },
    defaults: { 
      name: function $(name) {  
        return name;
      },
    },
  });

  assert(result.foo.name == 'foo'); // default -> inflate
}
defaultsThenInflate();

function inflateThenThunks() {
  
  var result = create({ 
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
  
  var result = create({
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
  
  var result = create({
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