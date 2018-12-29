'use strict';

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var objectEx = testRequire('@kingjs/object-ex');

var load = require('..');
var loader = load();
var IEnumerable = load('IEnumerable');
var IEnumerator = load('IEnumerator');

function testIndexable(o) {
  assert(o.length == 1);

  var type = loader.getInfo(o);
  var IEnumerableType = loader.getInfo(IEnumerable);
  assert(type.canCastTo(IEnumerableType));

  var enumerator = o[IEnumerable.getEnumerator]();
  assert(enumerator[IEnumerator.moveNext]());
  assert(enumerator[IEnumerator.current] == o[0]);
  assert(!enumerator[IEnumerator.moveNext]());
}
testIndexable([1]);
testIndexable('1');

function testLinq() {
  var linqAny = testRequire('@kingjs/linq.any');
  assert(linqAny);

  var linqAnySymbol = Symbol('@kingjs/linq.any');

  objectEx.defineFunction(
    Object.prototype,
    linqAnySymbol, {
      extends: () => IEnumerable,
      value: linqAny
    }
  );

  //assert([][linqAnySymbol]() == false);
  //assert([0][linqAnySymbol]() == true);
}
testLinq();

