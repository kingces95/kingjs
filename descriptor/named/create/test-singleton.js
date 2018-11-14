'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var write = testRequire('@kingjs/descriptor.object.write');

var decodedName = 'myName';

function badWrap() {
  var apple = {
    name: 'apple',
  };

  assertThrows(() => create(apple));
}
badWrap();

function wrapDeclarative() {
  var result = create({ 
    [decodedName]: 'apple'
  }, { 
    wrap: 'name' 
  });

  assert(result[decodedName].name == 'apple');  
}
wrapDeclarative();

function wrapProcedural() {
  var result = create({ 
    [decodedName]: 'apple'
  }, { 
    wrap: function(name) {
      return { name: name };
    }
  });

  assert(result[decodedName].name == 'apple'); 
}
wrapProcedural();

function inherit() {
  var result = create({ 
    [decodedName]: { }
  }, { 
    bases:[{ type: 'fruit' }]
  });

  assert(result[decodedName].type == 'fruit'); 
}
inherit();

function namedInherit() {
  var result = create({ 
    [decodedName]: { }
  }, { 
    basePoset: {
      fruit: { type: 'fruit' }  
    }, bases: [ 'fruit' ]
  });

  assert(result[decodedName].type == 'fruit'); 
}
namedInherit();

function defaults() {
  var result = create({ 
    [decodedName]: { }
  }, { 
    defaults: {
      type: 'fruit'
    }
  });

  assert(result[decodedName].type == 'fruit'); 
}
defaults();

function inflate() {
  var result = create({ 
    [decodedName]: {
      name: function $(name, key, path) {
        assert(key == 'name');
        assert(name == decodedName);
        assert(path == 42);
        return name;
      }
    }
  }, { 
    inflate: { '*': 42 }
  });

  assert(result[decodedName].name == decodedName);
}
inflate();

function thunk() {
  var result = create({ 
    [decodedName]: {
      type: 'fruit'
    }
  }, { 
    thunks: {
      type: function(value, name, key) {
        assert(value == 'fruit');
        assert(name == decodedName);
        assert(key == 'type');
        return 'food';
      }
    }
  });

  assert(result[decodedName].type == 'food');
}
thunk();

function scorch() {
  var result = create({ 
    [decodedName]: {
      name: undefined
    }
  }, { 
    scorch: { }
  });

  assert('name' in result[decodedName] == false);

  var result = create({
    [decodedName]: {
      foo: { value: undefined }, 
      bar: { value: undefined },
      baz: undefined
    }
  }, { 
    scorch: { foo: null } 
  }); 

  var descriptor = result[decodedName];
  assert('baz' in descriptor == false);
  assert('value' in descriptor.foo == false);
  assert('value' in descriptor.bar == true);
}
scorch();

function callback() {
  var result = create({ 
      [decodedName]: {
        name: undefined
      }
    }, 
    (descriptor, name) => write.call(descriptor, 'name', name)
  );

  assert(result[decodedName].name == decodedName);
}
callback();

function refs() {

  var result = create({ 
    foo: { id: 42 },
    bar: { refId: 'foo' }
  }, {
    refs: { refId: o => o.id }
  });

  assert(result.bar.refId == result.foo.id);
}
refs();

function depends() {

  var globalId = 0;

  var result = create({ 
    baz: { refId: 'bar' },
    foo: { refId: null },
    bar: { refId: 'foo' },
  }, {
    callback: o => write.call(o, 'id', globalId++),
    depends: { refId: o => o.id }
  });

  assert(result.foo.id == 0);
  assert(result.bar.id == 1);
  assert(result.baz.id == 2);

  assert(result.foo.refId == null);
  assert(result.bar.refId == result.foo.id);
  assert(result.baz.refId == result.bar.id);
}
depends();

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
    inflate: { '*': null },
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
    inflate: { '*': null },
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
    callback: function(value, name) {
      assert(value.foo == 0);
      assert(name == decodedName);
      assert('name' in value == false);
      return write.call(value, 'name', 'apple');
    }
  });

  assert(result.name == 'apple'); // scorch then callback
}
scorchThenCallback();