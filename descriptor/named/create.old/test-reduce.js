'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var write = testRequire('@kingjs/descriptor.object.write');
var is = testRequire('@kingjs/is');

assertTheory(function reduceWrap(test, id) {
  var result = create({
    foo: test.value,
    $wrap: test.family
  }, [{ 
    wrap: test.closer,
  }, { 
    wrap: test.further,
  }])

  var name = test.family || test.closer || test.further;
  if (is.function(name))
    name = Object.keys(name())[0];
  assert(result.foo[name] === test.value);
}, {
  value: [ 0, 1, undefined, null ],
  family: [ 'x', o => ({ x:o }), undefined ],
  closer: [ 'y', o => ({ y:o }), undefined ],
  further: [ 'z', o => ({ z:o }) ]
})

assertTheory(function reduceWrap(test, id) {
  var result = create({
    foo: { },
    $bases: [
      { x: 0 }
    ]
  }, [{ 
    bases: [
      { y: 1 },
    ],
  }, { 
    bases: [
      { z: 2 }
    ],
  }])

  assert(result.foo.x == 0);
  assert(result.foo.y == 1);
  assert(result.foo.z == 2);
}, {
  value: 0
})

function reduceBasePoset() {
  var result = create({
    foo: { },
    $bases: [ 'X' ],
    $basePoset: {
      X$Y$Z: { x: 0 },
    },
  }, [{ 
    basePoset: {
      Y: { y: 1, x: 1 },
    },
  }, { 
    basePoset: {
      Z: { z: 2, x: 2 },
    },
  }])

  assert(result.foo.x == 0);
  assert(result.foo.y == 1);
  assert(result.foo.z == 2);
};
//reduceBasePoset();

function reduceDefaults() {
  var result = create({
    apple: { name: 'apple' }
  }, [{ 
    defaults: { 
      size: 1,
      type: 'food' 
    }
  }, { 
    defaults: { 
      weight: 0,
      type: 'thing' 
    }
  }])

  assert(result.apple.size == 1);
  assert(result.apple.name == 'apple');
  assert(result.apple.type == 'food');
  assert(result.apple.weight == 0);
}
reduceDefaults();

// inflate
// thunk
// scorch
// callback
// depends
// refs