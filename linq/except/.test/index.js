require('kingjs')
var Except = require('..');
var assert = require('assert');
var SequenceEquals = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

assert(
  [0, 0, 1, 2]
    [Except]([1, 2])
    [SequenceEquals]([0])
);

var idAndName = [
  { id: 0, name: 'foo' },
  { id: 0, name: 'bar' },
  { id: 1, name: 'baz' },
];

var distinctIdAndName = 
  idAndName[Except](
    [{ id: 1, name: 'baz' }],
    function selectName(x) { return x.id; }
  )
  [ToArray]();

assert.deepEqual(distinctIdAndName, [
  { id: 0, name: 'foo' },
])