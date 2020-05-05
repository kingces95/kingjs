'use strict';

var odometer = require('..');
var assert = require('assert')

function assertSequenceEqual(left, right) {
  while (true) {
    var l = left.next();
    var r = right.next();

    assert(l.done == r.done);

    if (l.done)
      return;

    assert.deepEqual(l.value, r.value);
  }
}
function readMe() {
  assertSequenceEqual(odometer(1), [
    [0]
  ][Symbol.iterator]())

  assertSequenceEqual(odometer([1]), [
    [0]
  ][Symbol.iterator]())

  assertSequenceEqual(odometer(2, 2), [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ][Symbol.iterator]())

  assertSequenceEqual(odometer([2, 2]), [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ][Symbol.iterator]())
}
readMe();