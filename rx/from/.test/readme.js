var assert = require('assert');
var from = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var { Next, Complete, Error } = require('@kingjs/i-observer');

function example(value) {
  var next;
  var complete;
  
  new from(value)[Subscribe](
    o => next = o, 
    () => complete = true
  );
  
  assert(next == 1);
  assert(complete);
}
example([1]);
example(function *() { yield 1; });
