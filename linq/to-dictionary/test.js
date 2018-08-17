var toDictionary = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readme() {
  var result = toDictionary.call(
    sequence(
      { name: 'Alice', age: 18 },
      { name: 'Bob', age: 19 },
      { name: 'Chris', age: 20 },
    ), 
    function(x) { return x.name; },
    function(x) { return x.age; }
  );

  assert(!('toString' in result));
  assert(Object.keys(result).length == 3);
  assert(result.Alice == 18);
  assert(result.Bob == 19);
  assert(result.Chris == 20);
}
readme();

function defaultValueSelector() {
  var result = toDictionary.call(
    sequence(
      { name: 'Alice', age: 18 },
      { name: 'Bob', age: 19 },
      { name: 'Chris', age: 20 },
    ), 
    function(x) { return x.name; }
    // test default valueSelector
  );

  assert(!('toString' in result));
  assert(Object.keys(result).length == 3);
  assert(result.Alice.age == 18);
  assert(result.Bob.age == 19);
  assert(result.Chris.age == 20);
}
defaultValueSelector();

assertThrows(function() {
  toDictionary.call(
    sequence(0, 0), 
    function(x) { return x; }
  )
})
