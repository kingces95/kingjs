require('./readme.js')
var inherit = require('..');
var decode = require('@kingjs/poset.decode');
var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');

function ambiguous() {

  var decodeAndInherit = function(encodedPoset) {
    var vertices = { };
    var poset = decode.call(encodedPoset, vertices);
    return inherit.call(poset, vertices);
  }

  var result = decodeAndInherit({
    a$b$c: { x:0 },
    b: { x:1 },
    c: { x:2 },
  });
  assert(result.a.x == 0);  

  decodeAndInherit({
    a$b$c: { },
    b: { x:0 },
    c: { x:0 },
  });
  assert(result.a.x == 0);  

  assertThrows(
    function() {
      decodeAndInherit({
        a$b$c: { },
        b: { x:0 },
        c: { x:1 },
      });
    }, '"a" inherits an ambiguous value for property "x".'
  )
}
ambiguous();