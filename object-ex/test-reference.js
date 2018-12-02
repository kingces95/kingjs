'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var assertThrows = testRequire('@kingjs/assert-throws');

function manual() {
  var Type = function() { };
  var prototype = Type.prototype;
  Type.prototype = Object.create(prototype);

  var defaultToken = undefined;

  var name = 'myRef';

  function resolve() {
    return this[name];
  }

  objectEx.defineAccessor(
    prototype,
    name, {
      configurable: false,
      enumerable: true,
      lazy: true,
      external: true,
      get: function() {
        if (defaultToken === undefined)
          assert(false, derefBeforeAssignmentError);
    
        this[name] = defaultToken;
      },
      set: null
    }    
  )
}

function test() {
  var target = { 
    children: [ 42, 43, 44 ]
  };

  var counter = 0;
  function resolveOwnProperty(name) {
    if (name === undefined)
      return undefined;

    counter++;
    return this.children[name];
  }

  var defaultAddress = 2;
  objectEx.defineReference(target, 'foo', {
    enumerable: true,
    configurable: true,
    value: resolveOwnProperty 
  });
  objectEx.defineReference(target, 'bar', {
    enumerable: true,
    configurable: true,
    value: resolveOwnProperty, 
    default: defaultAddress
  })
  objectEx.defineReference(target, 'baz', {
    enumerable: true,
    configurable: true,
    value: resolveOwnProperty, 
    default: defaultAddress
  });

  assertThrows(() => target.foo);

  target.foo = undefined;
  assertThrows(() => target.foo);

  target.foo = undefined;
  assert(counter == 0);

  target.foo = '0';
  assert(counter == 1);

  target.bar = '1';
  assert(counter == 2);

  target.baz = undefined;
  assert(counter == 2);

  assert(target.foo == 42);
  assert(target.bar == 43);
  assert(target.baz == 44);
  assert(counter == 3);
}
test();

assertTheory(function(test, id) {
  var target = { id: 1 };
  function resolve(address) { 
    return this.id + address 
  };
  
  objectEx.defineReference(target, test.name, { 
    configurable: test.configurable,
    enumerable: test.enumerable,
    value: resolve, 
    default: test.default 
  });

  var descriptor = Object.getOwnPropertyDescriptor(target, test.name);
  assert(descriptor.enumerable == test.enumerable);
  assert(descriptor.configurable == test.configurable);

  target = Object.create(target);

  if (!test.default) {
    assertThrows(() => target[test.name]);
    target[test.name] = undefined;
    assertThrows(() => target[test.name]);
    target[test.name] = 2;
    assert(target[test.name] == 3);
  } else {
    target[test.name] = undefined;
    assert(target[test.name] == 4);
  }

  test.lazy = true;
  var descriptor = Object.getOwnPropertyDescriptor(target, test.name);
  assert(descriptor.enumerable == test.enumerable);
  assert(descriptor.configurable == false);
}, {
  name: ['foo', Symbol.for('foo') ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  default: [ undefined, 3 ]
})