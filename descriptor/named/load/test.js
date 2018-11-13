'use strict';

var load = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var write = testRequire('@kingjs/descriptor.write');

function trivialLoad() {

  var id = 0;

  var family = load.call({ 
    foo: { 
      id: null
    },
    bar: {
      id: null
    },
    baz: {
      id: null
    },
  }, o => write.call(o, 'id', id++));

  assert(family.foo.id != family.bar.id);
  assert(family.foo.id != family.baz.id);
  assert(family.bar.id != family.baz.id);

  assert(family.foo.id >= 0);
  assert(family.bar.id >= 0);
  assert(family.baz.id >= 0);

  assert(family.foo.id < 3);
  assert(family.bar.id < 3);
  assert(family.baz.id < 3);
}
trivialLoad();

function simpleLoad() {

  var family = load.call({ 
    foo: { 
      func: function foo() { },
      baseFunc: null
    },
    bar: {
      func: function bar() { },
      baseFunc: 'foo'
    },
    baz: {
      func: function baz() { },
      baseFunc: 'bar'
    },
  }, null, {
    '*': { baseFunc: o => o.func }
  });

  assert(family.foo.baseFunc == null);
  assert(family.bar.baseFunc == family.foo.func);
  assert(family.baz.baseFunc == family.bar.func);
}
simpleLoad();

function posetLoad() {

  var globalId = 0;

  var family = load.call({ 
    baz: {
      baseFunc: 'bar'
    },
    foo: { 
      baseFunc: null
    },
    bar: {
      baseFunc: 'foo'
    },
  }, o => {
    var id = globalId++;
    o = write.call(o, 'id', id);
    o = write.call(o, 'func', function() {
      var result = this.id;
      if (this.baseFunc)
        result += ' -> ' + this.baseFunc();
      return result;
    });
    return o;
  }, {
    '*': { baseFunc: o => o.func }
  });

  assert(family.foo.id == 0);
  assert(family.bar.id == 1);
  assert(family.baz.id == 2);
    
  assert(family.foo.baseFunc == null);
  assert(family.bar.baseFunc == family.foo.func);
  assert(family.baz.baseFunc == family.bar.func);

  assert(family.foo.func() == '0');
  assert(family.bar.func() == '1 -> 0');
  assert(family.baz.func() == '2 -> 1 -> 0');
}
posetLoad();