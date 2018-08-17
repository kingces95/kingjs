'use strict';

var define = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readme() {
  var currentTicks = define(

    function generatorFactory() {
      var generationsRemaining = arguments[0];
  
      return function generator() {
        if (generationsRemaining <= 0)
          return false;
        generationsRemaining--;

        // ensure at a tick elapses between generations
        if (this.current_) {
          while (this.current_ == Date.now())
            ;
        }

        this.current_ = Date.now();
        return true;
      }
    }
  );
  
  var enumerable = currentTicks(3);
  var enumerator = enumerable.getEnumerator();
  
  var actual = [];
  while (enumerator.moveNext())
    actual.push(enumerator.current);

  assert(actual.length == 3);
  assert(actual[0] < actual[1]);
  assert(actual[1] < actual[2]);
}
readme();

function lifeCycle() {
  var moveNextActivationCounter = 0;
  var moveNextCounter = 0;

  var value = { };
  var sequence = define(function() {
    moveNextActivationCounter++;
    var yieldedOnce = false;

    return function generator() {
      moveNextCounter++
      if (yieldedOnce)
        return false;
      this.current_ = value;
      yieldedOnce = true;
      return true; 
    }
  });

  var enumerable = sequence(0, 1, 2);
  assert(moveNextActivationCounter == 0);
  assert(moveNextCounter == 0);

  var enumerator = enumerable.getEnumerator();
  assert(moveNextActivationCounter == 0);
  assert(moveNextCounter == 0);

  assert(enumerator.moveNext());
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 1);
  assert(enumerator.current == value);

  assert(enumerator.moveNext() == false);
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);
  assert(enumerator.current === undefined);

  assert(enumerator.moveNext() == false);
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);
  assert(enumerator.current === undefined);


  enumerator = enumerable.getEnumerator();
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);

  assert(enumerator.moveNext());
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 3);
  assert(enumerator.current == value);

  assert(enumerator.moveNext() == false);
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 4);
  assert(enumerator.current === undefined);

  assert(enumerator.moveNext() == false);
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 4);
  assert(enumerator.current === undefined);
}
lifeCycle();

function justThis() {
  var generateThis = define(
    function generatorFactory() {
      var thisArg = this;
      var done = false;
      return function generator() {
        if (done)
          return false;
        this.current_ = thisArg;
        done = true
        return true;
      }
    }
  );

  var helloWorld = 'Hello world!';
  var justThis = generateThis.apply(helloWorld);
  var enumerator = justThis.getEnumerator();
  assert(enumerator.moveNext());
  assert(enumerator.current == helloWorld);
  assert(!enumerator.moveNext());
  assert(enumerator.current === undefined);
  assert(!enumerator.moveNext());
  assert(enumerator.current === undefined);
}
justThis();