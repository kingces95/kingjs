require('kingjs');
var zip = require('..');
var toArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  
  var result = zip.call(
    [1, 2, 3],
    sequence(`a`, `b`),
    function(n, l) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = toArray.call(result);

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readme();

function readmeFlipped() {
  
  var result = zip.call(
    sequence(`a`, `b`),
    [1, 2, 3],
    function(l, n) { 
      return { number: n, letter: l }; 
    }
  )
  
  var result = toArray.call(result);

  assert(result.length == 2);
  assert(result[0].number == 0);
  assert(result[0].letter == 'a');
  assert(result[1].number == 1);
  assert(result[1].letter == 'b');
}
readmeFlipped();