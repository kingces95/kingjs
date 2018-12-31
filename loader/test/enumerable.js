'use strict';

var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var objectEx = testRequire('@kingjs/object-ex');

var loader = require('..');
var info = loader.info;
var IEnumerable = loader.load('IEnumerable');
var IEnumerator = loader.load('IEnumerator');

var { getEnumerator } = IEnumerable;
var { moveNext, current } = IEnumerator;

function testIndexable(o) {
  assert(o.length == 1);

  var type = o[info];
  var IEnumerableType = IEnumerable[info];
  assert(type.canCastTo(IEnumerableType));

  var enumerator = o[getEnumerator]();
  assert(enumerator[moveNext]());
  assert(enumerator[current] == o[0]);
  assert(!enumerator[moveNext]());
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

