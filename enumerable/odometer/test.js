'use strict';

var odometer = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readme() {
  var enumerable = odometer(10, 10, 10, 10, 10, 10, 10);
  
  var generator = enumerable.getEnumerator();

  var actual = [];
  for (var distance = 0; distance < 11; distance++) {
    generator.moveNext();
    var current = generator.current;
    actual.push(current.reverse());
  }

  var expected = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 1, 0],
  ];

  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);

  assert(actualJSON == expectedJSON);
}
readme();

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
theory(odometer());
theory(odometer([1]), [[0]]);
theory(odometer([2]), [[0], [1]]);
theory(odometer([1,1]), [[0,0]]);
theory(odometer([1,2]), [[0,0], [0,1]]);
theory(odometer([2,2]), [[0,0], [1,0], [0,1], [1,1]]);
