var distinct = require('..');
var assert = require('assert');
var sequenceEquals = require('@kingjs/linq.sequence-equal');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var enumerable = [0, 0, 1, 1, 2, 2];
  assert(sequenceEquals.call(distinct.call(enumerable), [1, 2, 3]));
}
readme();

function readmeId() {
  var idAndName = [
    { id: 0, name: 'foo' },
    { id: 0, name: 'bar' },
  ]

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
  var enumerable = 'toString';
  assert(sequenceEquals.call(distinct.call(enumerable), 'toString'));
}
dictionaryTest();