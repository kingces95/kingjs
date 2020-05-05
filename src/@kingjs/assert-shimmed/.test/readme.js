var assert = require('assert');

var assertShimmed = () => require('..');
assert.throws(() => assertShimmed());

var IEnumerable = Symbol.for('@kingjs/IEnumerable.getEnumerator');

assert(IEnumerable in Array.prototype == false)
assert(IEnumerable in String.prototype == false)

require('kingjs');
assertShimmed();

assert(IEnumerable in Array.prototype)
assert(IEnumerable in String.prototype)