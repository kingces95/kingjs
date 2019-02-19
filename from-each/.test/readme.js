var fromEach = require('..');
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

assertSequenceEqual(fromEach({ foo: [] }), [
  { foo: undefined }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ foo: [0] }), [
  { foo: 0 }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ 
  foo: [0, 1], 
}), [
  { foo: 0 },
  { foo: 1 }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ 
  foo: [0, 1], 
  bar: [2], 
}), [
  { foo: 0, bar: 2 },
  { foo: 1, bar: 2 }
][Symbol.iterator]())

assertSequenceEqual(fromEach([ 
  [0, 1], 
  [2], 
]), [
  [0, 2],
  [1, 2]
][Symbol.iterator]())