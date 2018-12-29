'use strict';

var objectEx = require('@kingjs/object-ex');

var loader = require('../built-in');
var createLoader = require('../create');
var IEnumerable = require('../i-enumerable');
var IEnumerator = require('../i-enumerator');

var testRequire = require('../../../..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

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

