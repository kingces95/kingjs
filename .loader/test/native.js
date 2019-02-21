'use strict';

var require = require('../..');
var assert = require('assert');

var loader = require('..');
var info = loader.info;
var IEnumerable = loader.load('IEnumerable');
var IEnumerator = loader.load('IEnumerator');

var ObjectInfo = Object[info];
assert(loader.resolve('Object') == ObjectInfo);
assert(loader.resolve(Object) == ObjectInfo);

assert(ObjectInfo.load() == Object);
assert(loader.load('Object') == Object);

var ArrayInfo = Array[info];
assert(loader.resolve('Array') == ArrayInfo);
assert(loader.resolve(Array) == ArrayInfo);
assert(ArrayInfo.base == ObjectInfo);

var IEnumerableInfo = IEnumerable[info];
assert(IEnumerableInfo.load() == IEnumerable)
assert(ArrayInfo.canCastTo(IEnumerableInfo));

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
