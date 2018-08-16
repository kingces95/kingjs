var zip = require('./index');
var sequence = require('@kingjs/sequence');
var toArray = require('@kingjs/linq.to-array');
var assert = require('@kingjs/assert');

function readme() {
  
  var result = zip.call(
    sequence(0, 1, 2),
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
    sequence(0, 1, 2),
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