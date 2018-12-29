'use strict';

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');

var { load, info, resolve } = require('..');

var ObjectInfo = Object[info];
assert(resolve('Object') == ObjectInfo);
assert(resolve(Object) == ObjectInfo);

assert(ObjectInfo.load() == Object);
assert(load('Object') == Object);

var ArrayInfo = Array[info];
assert(resolve('Array') == ArrayInfo);
assert(resolve(Array) == ArrayInfo);
assert(ArrayInfo.base == ObjectInfo);

var IEnumerable = load('IEnumerable');
var IEnumerableInfo = IEnumerable[info];
assert(IEnumerableInfo.load() == IEnumerable)
assert(ArrayInfo.canCastTo(IEnumerableInfo));

var IEnumerator = load('IEnumerator');

var array = [42];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 42);
assert(!enumerator[IEnumerator.moveNext]());

var str = '4';
var enumerator = str[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == '4');
assert(!enumerator[IEnumerator.moveNext]());
