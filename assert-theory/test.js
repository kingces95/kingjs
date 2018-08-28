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

function observationsAsThis() {
  var observations = { 
    value: 0 
  };

  testTheory(function() {
    assert(this === observations); 
  }, observations);
}
observationsAsThis();

function runId() {
  var ran = false;

  testTheory(function(test, id) {
    ran = true;
    assert(id == 1); 
  }, {
    yesNo: [ true, false ]
  }, 1);

  assert(ran);
}
runId();

function primitive() {

  testTheory(function(o) {
    assert(o.nil === null);
    assert(o.undef === undefined);
    assert(o.number === 0);
    assert(o.string === '');
  }, {
    nil: null,
    undef: undefined,
    number: 0,
    string: '',
  });
}
primitive();

function values() {

  var values = { zero: 0 };

  testTheory(function(o) {
    assert(o.number === values.zero);
    assert(o.array === 0);
  }, {
    number: values,
    array: [ 0 ]
  });
}
values();