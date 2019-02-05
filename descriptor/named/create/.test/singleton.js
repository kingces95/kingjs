var assert = require('assert');

var create = require('..');
var write = require('@kingjs/descriptor.write');

function badWrap() {
  var apple = {
    name: 'apple',
  };

  assert.throws(() => create(apple));
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

// order before this test established by @kingjs/descriptor.create tests

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

  assert(result.foo.name == 'foo'); 
}
defaultsThenInflate();

// order before this test established by @kingjs/descriptor.map tests

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
    }, {
      callback: (descriptor, name) => write.call(descriptor, 'name', name)
    }
  );

  assert(result.myName.name == 'myName');
}
callback();
