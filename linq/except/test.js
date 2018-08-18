var except = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');
var sequenceEquals = testRequire('@kingjs/linq.sequence-equal');
var toArray = testRequire('@kingjs/linq.to-array');

var enumerable = sequence(0, 0, 1, 2);
assert(sequenceEquals.call(
  except.call(enumerable, sequence(1, 2)), 
  sequence(0)
));

var idAndName = sequence(
  { id: 0, name: 'foo' },
  { id: 0, name: 'bar' },
  { id: 1, name: 'baz' },
)

var distinctIdAndName = toArray.call(
  except.call(
    idAndName, 
    sequence({ id: 1, name: 'baz' }),
    function selectName(x) { return x.id; }
  )
);

var actualJSON = JSON.stringify(distinctIdAndName);
var expectedJSON = JSON.stringify([
  { id: 0, name: 'foo' },
]);

assert(actualJSON == expectedJSON);