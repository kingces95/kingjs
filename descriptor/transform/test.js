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

function wrapThenInherit() {
  var appleName = 'apple';
  var result = transform.call(appleName, '$fruit', {
    wrap: 'name',
    bases: { 
      fruit: { 
        type: 'fruit',
        name: 'unknown',
      }
    }
  })
  assert(appleName == 'apple');
  assert(result != appleName); // shallowClone
  assert(result.name == 'apple'); // wrap, inherit
  assert(result.type == 'fruit'); // inherit
}
wrapThenInherit();

function inheritThenDefaults() {
  var result = transform.call({ }, '$fruit', {
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
  var result = transform.call({ }, 'apple', {
    defaults: { 
      name: function $(name) {  
        return name;
      },
    },
  })
  assert(result.name == 'apple'); // default -> inflate
}
defaultsThenInflate();

function inflateThenThunks() {
  var result = transform.call({
    name: function $(name) {  
      return name;
    }
   }, 'apple', {
    thunks: {
      name: function() {
        return String.prototype.toUpperCase.call(this);
      }
    },
  })
  assert(result.name == 'APPLE'); // inflate -> thunks
}
inflateThenThunks();

function thunksThenScorch() {
  var result = transform.call({
    name: 'apple'
   }, undefined, {
    thunks: {
      name: function() {
        return undefined;
      }
    },
  })
  assert(`name` in result == false); // thunks -> scorch
}
thunksThenScorch();

function scorchThenCallback() {
  var result = transform.call({
    name: undefined
  }, undefined, function() {
    assert('name' in this == false);
    this.name = 'apple';
    return this;
  })
  assert(result.name == 'apple'); // scorch then callback
}
scorchThenCallback();