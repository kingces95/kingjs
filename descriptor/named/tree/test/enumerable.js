'use strict';

var createLoader = require('../js/loader/create');
var schema = require('../js/loader/schema');

var testRequire = require('../..');
var is = testRequire('@kingjs/is');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var Loader = schema.Loader;

function testIEnumerable() {

  var loader = Loader.builtIn;

  var IEnumerableType = loader.resolve('IEnumerable');
  assert(IEnumerableType);
  assert(IEnumerableType == Loader.IEnumerable);

  var IEnumeratorType = loader.resolve('IEnumerator');
  assert(IEnumeratorType);
  assert(IEnumeratorType == Loader.IEnumerator);
}
testIEnumerable();

function testArray() {
  var ArrayType = Loader.Array;  
  var IEnumerableType = Loader.IEnumerable;

  assert(ArrayType.canCastTo(IEnumerableType));
}
testArray();


