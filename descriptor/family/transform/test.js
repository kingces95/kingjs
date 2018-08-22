'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var result = map.call({
    apple: 'a',
    orange: 'o',
    banana: 'b'
  }, function(x) { 
    return String.prototype.toUpperCase.call(x); 
  })

  assert(result.apple == 'A');
  assert(result.orange == 'O');
  assert(result.banana == 'B');
}
readMe();