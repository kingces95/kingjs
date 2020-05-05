require('kingjs');
var Zip = require('..');
var ToArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  
  var result = [0, 1, 2][Zip](
    [`a`, `b`],
    function(n, l) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readme();

function readmeFlipped() {
  
  var result = [`a`, `b`][Zip](
    [0, 1, 2],
    function(l, n) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = result[ToArray]();

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readmeFlipped();