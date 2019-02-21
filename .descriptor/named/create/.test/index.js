var assert = require('assert');
var create = require('..');

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

require('./singleton');
require('./reduce');
require('./nested');