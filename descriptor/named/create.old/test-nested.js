'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var write = testRequire('@kingjs/descriptor.write');

function nestedDescriptorNestedAction() {
  var id = 0;

  var result = create([{
    $defaults: { type: 'fruit' },
    banana: { name: 'banana', type: 'yellow fruit' },
    orange: 'orange',
    apple: 'apple'
  }, {
    $defaults: { type: 'vegetable' },
    tomato: 'tomato'
  }, {
    bread: 'bread'
  }], [(o) => write.call(o, 'id', id++), { 
    wrap: 'name',
    defaults: { type: 'food' }
  }, { 
    defaults: { 
      weight: 0,
      type: 'thing' 
    }
  }])

  assert(result.apple.name == 'apple');
  assert(result.apple.type == 'fruit');

  assert(result.orange.name == 'orange');
  assert(result.orange.type == 'fruit');

  assert(result.banana.name == 'banana');
  assert(result.banana.type == 'yellow fruit');

  assert(result.tomato.name == 'tomato');
  assert(result.tomato.type == 'vegetable');

  assert(result.bread.name == 'bread');
  assert(result.bread.type == 'food');
}
nestedDescriptorNestedAction();

function nestedDescriptor() {
  var result = create([{
    $defaults: { id: 0 },
    foo: { }
  }, {
    $defaults: { id: 1 },
    bar: { }
  }, {
    baz: { id: 2 }
  }]);

  assert(result.foo.id == 0);
  assert(result.bar.id == 1);
  assert(result.baz.id == 2);
}
nestedDescriptor();
