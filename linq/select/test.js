var select = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequenceEqual = testRequire('@kingjs/linq.sequence-equal');
var sequence = testRequire('@kingjs/enumerable.create');

function readme() {
  function selectLowerCase(x) {
    return String.prototype.toLowerCase.call(x);
  }

  assert(sequenceEqual.call(
    select.call(sequence('A', 'B', 'C'), selectLowerCase), 
    sequence('a', 'b', 'c')
  ));
}
readme();

function appendIndex(x, i) {
  return x + i;
}

assert(sequenceEqual.call(
  select.call(sequence('A', 'B', 'C'), appendIndex), 
  sequence('A0', 'B1', 'C2')
));