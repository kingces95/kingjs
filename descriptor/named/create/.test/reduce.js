var assert = require('assert');

var create = require('..');
var assertTheory = require('@kingjs/assert-theory');
var write = require('@kingjs/descriptor.object.write');
var is = require('@kingjs/is');

assertTheory(function reduceWrap(test, id) {
  var result = create({
    foo: test.value,
    $wrap: test.family
  }, [{ 
    wrap: test.further,
  }, { 
    wrap: test.closer,
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

function reduceDefaults() {
  var result = create({
    apple: { name: 'apple' }
  }, [{ 
    defaults: { 
      weight: 0,
      type: 'thing' 
    }
  }, { 
    defaults: { 
      size: 1,
      type: 'food' 
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