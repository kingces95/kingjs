'use strict';

var testTheory = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readme() {
  var id = 0;

  testTheory(function(o, i) {
    assert(id++ == i);

    var naturalFirst = eval(o.natural + o.op + o.fraction);
    var fractionFirst = eval(o.fraction + o.op + o.natural);
    assert(naturalFirst == fractionFirst); 
  }, {
    op: [ '+', '*' ],
    natural: [1, 2, 3],
    fraction: [.1, .2, .3],
  });

  assert(id == 3 * 3 * 2);
}
readme();