'use strict';

var inherit = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readMe() {
  var student = { name: '', ssn: '000-00-0000', credits: 0 };
  var teacher = { name: '', ssn: '000-00-0000', pay: 0 };
  var alice = { name: 'Alice' };
  
  var result = inherit.call(alice, student, teacher);

  assert(result == alice);
  assert(result.name == 'Alice');
  assert(result.ssn == '000-00-0000');
  assert(result.credits == 0);
  assert(result.pay == 0);
}
readMe();

function ambiguous() {
  var target = { };
  var x = { value: 1 };
  var y = { value: 2 };
  var result = inherit.call({ value = 0 }, x, y);
  assert(target == result);
  assert(result.value == 0);

  assertThrows(function() {
    var x = { value: 0 };
    var y = { value: 1 };
    inherit.call({ }, x, y);
  });
}
ambiguous();