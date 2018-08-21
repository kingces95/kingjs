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

function arg1() {
  var result = map.call({
    apple: 'a',
    orange: 'o',
    banana: 'b'
  }, function(x, name) { 
    return name; 
  })

  assert(result.apple == 'apple');
  assert(result.orange == 'orange');
  assert(result.banana == 'banana');
}
arg1();

function arg2() {
  var fruits = {
    apple: 'a',
    orange: 'o',
    banana: 'b'
  };
  var result = map.call(fruits, 
    function(x, name, descriptor) { 
      return descriptor; 
    }
  )

  assert(result.apple == fruits);
  assert(result.orange == fruits);
  assert(result.banana == fruits)
}
arg2();