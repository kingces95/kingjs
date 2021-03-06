'use strict';

var merge = require('.');

var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');
var takeLeft = require('@kingjs/func.return-arg-0');
var takeRight = require('@kingjs/func.return-arg-1');
var isFrozen = require('@kingjs/descriptor.is-frozen');
var clone = require('@kingjs/descriptor.object.clone');

function readMe(skipIfDefined) {

  var target = { 
    a: 0,
    b: 1, 
  };
  
  var delta = { 
    b: 2,
    c: 3
  };
  
  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, delta, resolve);

  assert(target != result);
  assert(target.a == 0);
  assert(target.b == 1);
  
  assert(Object.isFrozen(result));
  assert(isFrozen.call(result));

  assert(Object.keys(result).length == 3);
  assert(result.a == 0);
  assert(result.b == skipIfDefined ? 1 : 2);
  assert(result.c == 3);
}
readMe(false);
readMe(true);

function conflict() {

  // conflict
  assertThrows(function() {
    merge.call(
      { a: 1 }, 
      { a: 0 }
    )
  });
  
  // conflict but same value
  var delta = Object.freeze({ a: 0 });
  var result = merge.call(delta, { a: 0 }, returnZero);
  assert(delta == result);

  // conflict but resolved to same value
  var returnZero = function() { return 0; };
  merge.call(delta, { a: 1 }, returnZero);
  assert(delta == result);
}
conflict();

function missingDelta() {
  var target = { };

  var result = merge.call(target, undefined);
  assert(target == result);

  var result = merge.call(target, null);
  assert(target == result);
}
missingDelta();

function uninitialized(skipIfDefined) {
  var target = { 
    a: undefined 
  };
  var delta = { 
    a: 0,
    b: undefined
  };

  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, delta, resolve);
  assert(Object.keys(result).length == 2);
  assert(target.a === skipIfDefined ? undefined : 0);
  assert(target.b == undefined);
}
uninitialized(false);
uninitialized(true);

function hidden(skipIfDefined) {
  var target = { };
  var delta = Object.defineProperties({ }, {
    a: { value: 0 }
  });
  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, delta, resolve);
  assert(Object.keys(result).length == 0);
}
hidden(false);
hidden(true);

function resolveOnName() {
  var target = { a:0, b:0 };
  var delta = { a:1, b:1 };

  var result = merge.call(target, delta, function(left, right, name) {
    return name == 'a' ? left : right;
  });
  assert(result.a == 0);
  assert(result.b == 1);
}
resolveOnName();

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => merge.call(thawed));
}
precondition();

require('./theory')