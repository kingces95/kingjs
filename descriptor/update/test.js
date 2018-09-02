'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {

  var makeEven = update.define(
    function(target) {
      for (var name in this) {
        var value = this[name];
        if (value % 2 == 0)
          continue;
        
        target = update.call(
          this, target, name, value + 1
        );
      }
      return target;
    }, 0
  );
  
  var numbers = {
    x: 0,
    y: 1,
    z: 2
  }
  
  Object.freeze(numbers);
  
  var copyOnWrite = true;
  var evenNumbers = makeEven.call(numbers, copyOnWrite);
  
  assert(evenNumbers != numbers);
  assert(Object.isFrozen(evenNumbers));
  assert(evenNumbers.x == 0);
  assert(evenNumbers.y == 2);
  assert(evenNumbers.z == 2);
}
readMe();

function args() {
  var argValue = 'foo';

  var func = update.define(
    function(target, arg) {
      assert(arg == argValue);
      return target;
    }, 1
  );

  func.call({ }, argValue, false);
}
args();

assertTheory(function(test, id) {

  var source = { };
  source[test.name] = test.value;

  if (test.frozen)
    Object.freeze(source);

  var func = update.define(
    function(target) {
      target = update.call(
        this, target, test.name, test.delta
      );
      return target;
    }, 0
  );

  var result = func.call(source, test.copyOnWrite);

  assert(
    Object.isFrozen(source) == 
    Object.isFrozen(result)
  );

  var actual = result[test.name];
  var expected = test.delta === undefined ? 
    test.value : test.delta;

  assert(
    actual === expected
  );

  assert(
    (source != result) == (
      actual !== test.value &&
        (Object.isFrozen(source) || test.copyOnWrite)
    )
  )  
}, {
  name: 'foo',
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ]
}, 16);

