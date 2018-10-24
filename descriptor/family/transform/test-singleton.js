'use strict';

var transformFamily = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var decodedName = 'myName';

function transform(encodedName, action) {
  var family = { };
  family[encodedName] = this;
  var result = transformFamily.call(family, action);

  for (var name in result)
    return result[name];
}

function noop() {
  var apple = {
    name: 'apple',
  };

  var result = transform.call(apple);

  assert(result == apple);
}
//noop();

function wrapDeclarative() {
  var result = transform.call('apple', decodedName, { wrap: 'name' });
  assert(result.name == 'apple');  
}
wrapDeclarative();

function wrapProcedural() {
  var result = transform.call('apple', decodedName, {
    wrap: function(name) {
      return { name: name };
    }
  });
  assert(result.name == 'apple');  
}
wrapProcedural();

function inherit() {
  var result = transform.call({ }, decodedName + '$fruit', {
    bases: {
      fruit: { type: 'fruit' }  
    }
  });

  assert(result.type == 'fruit');
}
inherit();

function defaults() {
  var result = transform.call({ }, decodedName, {
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
   }, decodedName);

  assert(result.name == decodedName);
}
inflate();

function thunk() {
  var result = transform.call({
    type: 'fruit'
  }, decodedName, {
    thunks: {
      type: function(name, value, key) {
        assert(value == 'fruit');
        assert(name == decodedName);
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
  }, decodedName, { scorch: { } }); 

  assert('name' in result == false);

  var result = transform.call({
    foo: { value: undefined }, 
    bar: { value: undefined },
    baz: undefined
  }, decodedName, { scorch: { foo: null } }); 

  assert('baz' in result == false);
  assert('value' in result.foo == false);
  assert('value' in result.bar == true);
}
scorch();

function callback() {

  var result = transform.call(
    { }, decodedName, function(name, descriptor) {
      descriptor.name = name;
      return descriptor; 
    }
  );

  assert(result.name == decodedName);
}
callback();

function wrapThenInherit() {
  var appleName = 'apple';
  var result = transform.call(appleName, decodedName + '$fruit', {
    wrap: 'name',
    bases: { 
      fruit: { 
        type: 'fruit',
        name: 'unknown',
      }
    }
  })

  assert(result.name == 'apple'); // wrap, inherit
  assert(result.type == 'fruit'); // inherit
}
wrapThenInherit();

function inheritThenDefaults() {
  var result = transform.call({ }, decodedName + '$fruit', {
    defaults: { 
      type: 'unknown',
      color: 'unknown' 
    },
    bases: { 
      fruit: { 
        type: 'fruit',
      }
    }
  })
  assert(result.type == 'fruit'); // inherit
  assert(result.color == 'unknown'); // defaults
}
inheritThenDefaults();

function defaultsThenInflate() {
  var result = transform.call({ }, decodedName, {
    defaults: { 
      name: function $(name) {  
        return name;
      },
    },
  })
  assert(result.name == decodedName); // default -> inflate
}
defaultsThenInflate();

function inflateThenThunks() {
  var result = transform.call({
    name: function $(name) {  
      return name;
    }
   }, 'apple', {
    thunks: {
      name: function(name, value, key) {
        return String.prototype.toUpperCase.call(value);
      }
    },
  })
  assert(result.name == 'APPLE'); // inflate -> thunks
}
inflateThenThunks();

function thunksThenScorch() {
  var result = transform.call({
    name: 'apple'
  }, decodedName, {
    scorch: { },
    thunks: {
      name: function(name, value, key) {
        return undefined;
      }
    },
  })
  assert(`name` in result == false); // thunks -> scorch
}
thunksThenScorch();

function scorchThenCallback() {
  var result = transform.call({
    foo: 0,
    name: undefined
  }, decodedName, {
    scorch: { },
    callback: function(name, value) {
      assert(value.foo == 0);
      assert('name' in value == false);
      value.name = 'apple';
      return value;
    }
  });

  assert(result.name == 'apple'); // scorch then callback
}
scorchThenCallback();