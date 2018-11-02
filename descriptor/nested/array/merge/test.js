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

  assert(result[0] == 4);
  assert(result[1][0] == 4);
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

  assertThrows(function() { merge(0, 1); });
  assert(merge(0, [ ]) == 0);
  assertThrows(function() { merge([ ], 1); });
}
baseCase();

function newObject() {

  var result = merge(null, [ 0 ]);
  assert(result === null);

  result = merge(undefined, [ 0 ]);
  assert(result[0] == 0);
}
newObject();

function createPaths() {
  var b = { };
  var a = [ [ b, 'a' ] ];

  var aCopy = merge(undefined, a, takeRight);
  assert(aCopy != a);
  assert(aCopy instanceof Array == false);
  assert(aCopy[0][0] == b);
  assert(aCopy[0][1] == 'a');
}
createPaths();

function recursive() {

  var result = merge({
    a0: 0,
    a1: 0,
    a2: 0,
    a3: { b0: 0 },
    a4: { b0: 0, b1: 0, b2: 0 },
    a5: { b0: 0 }
  }, { 
    a0: 1,
    a1: 1,
    a3: { b0: 1 },
    a4: { b0: 1, b1: 1 }
  }, {
    a0: takeRight,
    a2: takeRight,
    a4: { b0: takeRight, b2: takeRight },
    a5: { b0: takeRight }
  });

  assert(result.a0 == 1);
  assert(result.a2 == 0);
  assert(result.a1 == 0);
  assert(result.a3.b0 == 0);
  assert(result.a4.b0 == 1);
  assert(result.a4.b1 == 0);
  assert(result.a4.b2 == 0);
  assert(result.a3.b0 == 0);

}
recursive();

require('./theory')