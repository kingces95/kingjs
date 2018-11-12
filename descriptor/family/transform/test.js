'use strict';

var transform = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var write = testRequire('@kingjs/descriptor.object.write');

function readMe() {
  var result = transform.call({
    apple: 'apple',
    orange: 'orange',
    banana: 'banana'
  }, { 
    wrap: 'name'
  })

  assert(result.apple.name == 'apple');
  assert(result.orange.name == 'orange');
  assert(result.banana.name == 'banana');
}
readMe();

function mergeDefaultAction() {
  var result = transform.call({
    apple: 'apple'
  }, [{ 
    wrap: 'name',
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
mergeDefaultAction();

function familyAction() {
  var id = 0;

  var result = transform.call([{
    $defaults: { type: 'fruit' },
    banana: { name: 'banana', type: 'yellow fruit' },
    orange: 'orange',
    apple: 'apple'
  }, {
    $defaults: { type: 'vegetable' },
    tomato: 'tomato'
  }, {
    bread: 'bread'
  }], [(_,o) => write.call(o, 'id', id++), { 
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
familyAction();

function isolateFamilyAction() {
  var result = transform.call([{
    $defaults: { id: 0 },
    foo: { }
  }, {
    $defaults: { id: 1 },
    bar: { }
  }, {
    baz: { }
  }]);
}
isolateFamilyAction();

function depends() {
  var result = transform.call({
    vehicle: { id: 0, name: 'Vehicle' },
    truck: { id: 1, name: 'Truck', base: 'vehicle' }
  }, { 
    defaults: { base: null },
    depends: { base: o => o.id }
  })

  assert(result.truck.base == 0);
}
depends();