require('kingjs');
var assert = require('assert');
var Distinct = require('..');
var SequenceEquals = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var enumerable = [0, 0, 1, 1, 2, 2];
  enumerable = enumerable[Distinct]();
  assert(enumerable[SequenceEquals]([0, 1, 2]));
}
readme();

function readmeId() {
  var idAndName = [
    { id: 0, name: 'foo' },
    { id: 0, name: 'bar' },
  ]

  var distinctIdAndName =
    idAndName[Distinct](x => x.id)
    [ToArray]()

  assert.deepEqual(distinctIdAndName, [{ id: 0, name: 'foo' }]);
}
readmeId();

function dictionaryTest() {
  var enumerable = 'toString';
  enumerable = enumerable[Distinct]();
  enumerable = enumerable[ToArray]()
  assert(enumerable[SequenceEquals]('toSring'));
}
dictionaryTest();