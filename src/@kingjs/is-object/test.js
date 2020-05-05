'use strict';

var isObject = require('.');

var assert = require('@kingjs/assert')

function readMe() {

  var result = {
    undef: isObject(),
    number: isObject(10),
    nll: isObject(null),
    string: isObject('Hi!'),
    func: isObject(function() { }), 
    array: isObject([ ]), 
    literal: isObject({ }), 
  };

  assert(!result.undef);
  assert(!result.number);
  assert(!result.nll);
  assert(!result.string);
  assert(!result.func);
  assert(result.array);
  assert(result.literal);
}
readMe();