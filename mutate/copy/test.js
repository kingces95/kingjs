'use strict';

var copy = require('./index');
var assert = require('@kingjs/assert')

function readMe(skipIfDefined) {

  var target = { 
    a: 0,
    b: 1, 
  };
  
  var source = { 
    b: 2,
    c: 3
  };
  
  var result = copy.call(target, source, skipIfDefined);

  assert(target == result);
  assert(Object.keys(target).length == 3);
  assert(target.a == 0);
  assert(target.b == skipIfDefined ? 1 : 2);
  assert(target.c == 3);
}
readMe(false);
readMe(true);

function missingSource() {
  var target = { };
  var result = copy.call(target);
  assert(target == result);
}
missingSource();

function uninitialized(skipIfDefined) {
  var target = { 
    a: undefined 
  };
  var source = { 
    a: 0,
    b: undefined
  };
  var result = copy.call(target, source, skipIfDefined);
  assert(Object.keys(result).length == 2);
  assert(target.a === skipIfDefined ? undefined : 0);
  assert(target.b == undefined);
}
uninitialized(false);
uninitialized(true);

function hidden(skipIfDefined) {
  var target = { };
  var source = Object.defineProperties({ }, {
    a: { value: 0 }
  });
  var result = copy.call(target, source, skipIfDefined);
  assert(Object.keys(result).length == 0);
}
hidden(false);
hidden(true);

function inherited(skipIfDefined) {
  var target = { };
  var source = { };
  Object.setPrototypeOf(source, { a: 0 });

  var result = copy.call(target, source, skipIfDefined);
  assert(Object.keys(result).length == 1);
  assert(target.a == 0);
}
inherited(false);
inherited(true);

function skipIfDefinedFunction() {
  var target = { a:0, b:0 };
  var source = { a:1, b:1 };

  var result = copy.call(target, source, function(name) {
    return name == 'a';
  });
  assert(target.a == 0);
  assert(target.b == 1);
}
skipIfDefinedFunction(false);