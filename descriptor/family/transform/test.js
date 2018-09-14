'use strict';

var transform = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

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

function depends() {
  var result = transform.call({
  object: { id: 0, name: 'Object' },
    truck: { id: 1, name: 'Truck', base: 'object' }
  }, { 
    defaults: { base: null },
    depends: { base: o => o.id }
  })

  //assert(result.truck.base.id == 0);
}
depends();