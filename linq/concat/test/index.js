var concat = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var { load } = require('@kingjs/loader');
var { getEnumerator } = load('IEnumerable');
var { moveNext, current } = load('IEnumerator');

var result = [0, 1][concat]([1, 2]);

var enumerator = result[getEnumerator]();
assert(enumerator[moveNext]());
assert(enumerator[current] == 0);

assert(enumerator[moveNext]());
assert(enumerator[current] == 1);

assert(enumerator[moveNext]());
assert(enumerator[current] == 1);

assert(enumerator[moveNext]());
assert(enumerator[current] == 2);

assert(!enumerator[moveNext]());