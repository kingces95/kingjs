require('kingjs')

var assert = require('assert');

var Concat = require('..');
var { GetEnumerator } = require('@kingjs/i-enumerable');
var { MoveNext, Current } = require('@kingjs/i-enumerator');

var result = [0, 1][Concat]([1, 2]);

var enumerator = result[GetEnumerator]();
assert(enumerator[MoveNext]());
assert(enumerator[Current] == 0);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 1);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 1);

assert(enumerator[MoveNext]());
assert(enumerator[Current] == 2);

assert(!enumerator[MoveNext]());