'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var takeRight = testRequire('@kingjs/func.return-arg-1')

function readme() {
  
  var lhs = [
    0, [
      1, [
        2
      ],
      3
    ],
    4
  ];

  var rhs = [
    4, [
      3, [
        2,
      ],
      1
    ],
    0
  ]
  
  var result = merge(lhs, rhs, (l,r) => l + r);

  assert(result instanceof Array);
  assert(result[0] == 4);

  assert(result[1] instanceof Array);
  assert(result[1][0] == 4);

  assert(result[1][1] instanceof Array);
  assert(result[1][1][0] == 2); // no conflict; 2 == 2
  assert(result[1][2] == 4); 

  assert(result[2] == 4);
}
readme();

function baseCase() {
  var result = merge();
  assert(result === undefined);

  result = merge(0, undefined);
  assert(result == 0);

  result = merge(undefined, 0);
  assert(result == 0);

  result = merge(0, 1, function(target, source) {
    assert(target == 0);
    assert(source == 1);
    return 2;
  });
  assert(result == 2);

  assertThrows(() => merge(0, 1));
  assertThrows(() => merge(0, [ ]));
  assertThrows(() => merge([ ], 1));
}
baseCase();

function newObject() {
  var result = merge(undefined, [ 0 ]);
  assert(result instanceof Array);
  assert(result[0] == 0);
}
newObject();

function createPaths() {
  var b = { };
  var a = [ [ b, 'a' ] ];

  var aCopy = merge(undefined, a, takeRight);
  assert(aCopy != a);
  assert(aCopy instanceof Array);
  assert(aCopy[0][0] == b);
  assert(aCopy[0][1] == 'a');
}
createPaths();

function recursive() {

  var result = merge([
    0, 0, 0,
    [0], 
    [0, 0, 0], 
    [0]
  ],[
    1, 1, undefined,
    [1], 
    [1, 1, undefined],
    [1, 1]
  ], takeRight);

  assert(result instanceof Array);
  assert(result[0] == 1);
  assert(result[1] == 1);
  assert(result[2] == 0);

  assert(result[3] instanceof Array);
  assert(result[3][0] == 1);

  assert(result[4] instanceof Array);
  assert(result[4][0] == 1);
  assert(result[4][1] == 1);
  assert(result[4][2] == 0);

  assert(result[5] instanceof Array);
  assert(result[5][0] == 1);
  assert(result[5][1] == 1);
}
recursive();

//require('./theory')