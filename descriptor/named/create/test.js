'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  var result = create({
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

require('./test-singleton');
require('./test-reduce');
require('./test-nested');