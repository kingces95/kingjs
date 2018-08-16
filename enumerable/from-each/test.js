'use strict';

var fromEach = require('./index');
var toArray = require('@kingjs/linq.to-array');
var assert = require('@kingjs/assert');

function assertExpected(actual) {

  var expected = [
    [ 'S', 'Red' ],
    [ 'M', 'Red' ],
    [ 'L', 'Red' ],
    [ 'S', 'Green' ],
    [ 'M', 'Green' ],
    [ 'L', 'Green' ]
  ];
  
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);

  assert(actualJSON == expectedJSON);
}

function readmeDescriptor() {
  var shirts = fromEach({
    size: [ 'S', 'M', 'L' ],
    color: [ 'Red', 'Green' ]
  });
  
  assertExpected(toArray.call(shirts).map(
    function(x) { return [x.size, x.color ]; }
  ));
}
readmeDescriptor();

function readmeArray() {

  var size = [ 'S', 'M', 'L' ];
  var color = [ 'Red', 'Green' ];
  var shirts = fromEach([size, color]);
  
  assertExpected(toArray.call(shirts));
}
readmeArray();

function theory(enumerable, expected) {
  var generator = enumerable.getEnumerator();

  var actual = undefined;
  if (generator.moveNext()) {
    actual = [];
    do {
      actual.push(generator.current);
    } while (generator.moveNext())
  }
  
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);
  
  assert(actualJSON == expectedJSON);
}
theory(fromEach());
theory(fromEach([[0]]), [[0]]);
theory(fromEach([[0,1]]), [[0], [1]]);
theory(fromEach([[0,1], [2]]), [[0,2], [1,2]]);
theory(fromEach([[0,1], [2,3]]), [[0,2], [1,2], [0,3], [1,3]]);
