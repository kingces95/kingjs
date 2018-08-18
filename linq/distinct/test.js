var distinct = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');
var sequenceEquals = testRequire('@kingjs/linq.sequence-equal');
var toArray = testRequire('@kingjs/linq.to-array');

function readme() {
  var enumerable = sequence(0, 0, 1, 1, 2, 2);
  assert(sequenceEquals.call(distinct.call(enumerable), sequence(0, 1, 2)));
}
readme();

function readmeId() {
  var idAndName = sequence(
    { id: 0, name: 'foo' },
    { id: 0, name: 'bar' },
  )

  var distinctIdAndName = toArray.call(
    distinct.call(
      idAndName, 
      function selectName(x) { return x.id; }
    )
  );

  var actualJSON = JSON.stringify(distinctIdAndName);
  var expectedJSON = JSON.stringify([
    { id: 0, name: 'foo' },
  ]);

  assert(actualJSON == expectedJSON);
}
readmeId();

function dictionaryTest() {
  var enumerable = sequence('toString');
  assert(sequenceEquals.call(distinct.call(enumerable), sequence('toString')));
}
dictionaryTest();