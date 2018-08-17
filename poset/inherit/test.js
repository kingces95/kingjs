'use strict';

var inherit = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function readMe() {
  var vehicleDescriptors = {
    car$vehicle: { },
    truck$vehicle: { },
    bigRig$vehicle: { tires: 18 },
    vehicle: { tires: 4 }
  };
  
  var result = inherit(vehicleDescriptors);
  assert(Object.keys(result).length == 4);
  assert(result.car.tires == 4);
  assert(result.truck.tires == 4);
  assert(result.bigRig.tires == 18);
  assert(result.vehicle.tires == 4);
}
readMe();

function readMeGeneral() {
  var result = inherit({
    A$B$C: { a:0 },
    B$D: { b:0 },
    C$D: { c:0 },
    D: { d:0 },
  });

  assert(Object.keys(result).length == 4);
  assert(result.A.a == 0);
  assert(result.A.b == 0);
  assert(result.A.c == 0);
  assert(result.A.d == 0);

  assert(result.B.b == 0);
  assert(result.B.d == 0);

  assert(result.C.c == 0);
  assert(result.C.d == 0);
}
readMeGeneral();

function readMeDecoded() {
  var vertices = {
    A: { a:0 },
    B: { b:0 },
    C: { c:0 },
    D: { d:0 },
  };
  var edges = {
    A: [ 'B', 'C' ],
    B: [ 'D' ],
    C: [ 'D' ],
  };
  var result = inherit(vertices, edges);

  assert(Object.keys(result).length == 4);
  assert(result.A.a == 0);
  assert(result.A.b == 0);
  assert(result.A.c == 0);
  assert(result.A.d == 0);

  assert(result.B.b == 0);
  assert(result.B.d == 0);

  assert(result.C.c == 0);
  assert(result.C.d == 0);
}
readMeDecoded();

function ambiguous() {

  var result = inherit({
    a$b$c: { x:0 },
    b: { x:1 },
    c: { x:2 },
  });
  assert(result.a.x == 0);  

  inherit({
    a$b$c: { },
    b: { x:0 },
    c: { x:0 },
  });
  assert(result.a.x == 0);  

  assertThrows(
    function() {
      inherit({
        a$b$c: { },
        b: { x:0 },
        c: { x:1 },
      });
    }, '"a" inherits an ambiguous value for property "x".'
  )
}
ambiguous();