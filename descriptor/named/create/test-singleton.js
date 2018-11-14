'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var write = testRequire('@kingjs/descriptor.object.write');

function badWrap() {
  var apple = {
    name: 'apple',
  };

  assertThrows(() => create(apple));
}
badWrap();

function wrapDeclarative() {
  var result = create({ 
    myName: 'apple'
  }, { 
    wrap: 'name' 
  });

  assert(result.myName.name == 'apple');  
}
wrapDeclarative();

function wrapProcedural() {
  var result = create({ 
    myName: 'apple'
  }, { 
    wrap: function(name) {
      return { name: name };
    }
  });

  assert(result.myName.name == 'apple'); 
}
wrapProcedural();

function inherit() {
  var result = create({ 
    myName: { }
  }, { 
    bases:[{ type: 'fruit' }]
  });

  assert(result.myName.type == 'fruit'); 
}
inherit();

function namedInherit() {
  var result = create({ 
    myName: { }
  }, { 
    basePoset: {
      fruit: { type: 'fruit' }  
    }, bases: [ 'fruit' ]
  });

  assert(result.myName.type == 'fruit'); 
}
namedInherit();

function encodedInherit() {
  var result = create({ 
    myName$fruit: { }
  }, { 
    basePoset: {
      fruit: { type: 'fruit' }  
    }
  });

  assert(result.myName.type == 'fruit'); 
}
encodedInherit();

function defaults() {
  var result = create({ 
    myName: { }
  }, { 
    defaults: {
      type: 'fruit'
    }
  });

  assert(result.myName.type == 'fruit'); 
}
defaults();

function inflate() {
  var result = create({ 
    myName: {
      name: function $(name, key, path) {
        assert(key == 'name');
        assert(name == 'myName');
        assert(path == 42);
        return name;
      }
    }
  }, { 
    inflate: { '*': 42 }
  });

  assert(result.myName.name == 'myName');
}
inflate();

function thunk() {
  var result = create({ 
    myName: {
      type: 'fruit'
    }
  }, { 
    thunks: {
      type: function(value, name, key) {
        assert(value == 'fruit');
        assert(name == 'myName');
        assert(key == 'type');
        return 'food';
      }
    }
  });

  assert(result.myName.type == 'food');
}
thunk();

function scorch() {
  var result = create({ 
    myName: {
      name: undefined
    }
  }, { 
    scorch: { }
  });

  assert('name' in result.myName == false);

  var result = create({
    myName: {
      foo: { value: undefined }, 
      bar: { value: undefined },
      baz: undefined
    }
  }, { 
    scorch: { foo: null } 
  }); 

  var descriptor = result.myName;
  assert('baz' in descriptor == false);
  assert('value' in descriptor.foo == false);
  assert('value' in descriptor.bar == true);
}
scorch();

function callback() {
  var result = create({ 
    myName: {
        name: undefined
      }
    }, 
    (descriptor, name) => write.call(descriptor, 'name', name)
  );

  assert(result.myName.name == 'myName');
}
callback();

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

function dependsAlt() {
  var result = create({
    vehicle: { id: 0, name: 'Vehicle' },
    truck: { id: 1, name: 'Truck', base: 'vehicle' }
  }, { 
    defaults: { base: null },
    depends: { base: o => o.id }
  })

  assert(result.truck.base == 0);
}
dependsAlt();

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