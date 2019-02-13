'use strict';

var load = require('.');

var assert = require('assert');
var write = require('@kingjs/descriptor.write');

function trivialLoad() {

  var id = 0;
  var argThis = { };

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
  }, function(o, n) {
    assert(this == argThis);
    assert(n == 'foo' || n == 'bar' || n == 'baz');
    return write.call(o, 'id', id++);
  }, null, argThis);

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

function simpleLoad(declarativeRef) {

  var argThis = { };

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
  }, null, declarativeRef ? {
    '*': { baseFunc: o => o.func }
  } : function (name) {
    assert(this == argThis);
    assert(name == 'foo' || name == 'bar' || name == 'baz');
    return { baseFunc: o => o.func }
  }, argThis);

  assert(family.foo.baseFunc == null);
  assert(family.bar.baseFunc == family.foo.func);
  assert(family.baz.baseFunc == family.bar.func);
}
simpleLoad(true);
simpleLoad(false);

function posetToTrivialLoad() {

  var globalId = 0;
  var argThis = { };

  var family = load.call({ 
    baz: { },
    foo: { },
    bar: { },
  }, function(o, n) {
    assert(this == argThis);
    assert(n == 'foo' || n == 'bar' || n == 'baz');
    var id = globalId++;
    o = write.call(o, 'id', id);
    return o
  }, { /* optimize this case */ }, argThis);

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
posetToTrivialLoad();

function posetLoad(declarativeRef) {

  var funcId = 0;
  var globalId = 0;
  var argThis = { };

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
  }, function(o, n) {
    assert(this == argThis);
    assert(n == 'foo' || n == 'bar' || n == 'baz');

    var id = globalId++;
    o = write.call(o, 'id', id);

    var func = function() {
      var result = this.id;
      assert(this.func != this.baseFunc);
      if (this.baseFunc)
        result += ' -> ' + this.baseFunc();
      return result;
    };
    func.id = funcId++;
    o = write.call(o, 'func', func);

    return o;
  }, declarativeRef ? {
    '*': { baseFunc: o => (() => o.func()) }
  } : function(name) { 
    assert(this == argThis);
    assert(name == 'foo' || name == 'bar' || name == 'baz');
    return { baseFunc: o => (() => o.func()) }
  }, argThis);

  assert(family.foo.id == 0);
  assert(family.bar.id == 1);
  assert(family.baz.id == 2);
      
  assert(family.foo.func() == '0');
  assert(family.bar.func() == '1 -> 0');
  assert(family.baz.func() == '2 -> 1 -> 0');
}
posetLoad(true);
posetLoad(false);

require('./test-primitive')