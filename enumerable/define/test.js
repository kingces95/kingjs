'use strict';

var defineEnumerator = require('.');
var assert = require('assert');
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');

var { getEnumerator } = IEnumerable;
var { moveNext, current } = IEnumerator;

function readme() {
  var currentTicks = defineEnumerator(

    function generatorFactory(tickCount) {
  
      return function generator() {
        if (tickCount <= 0)
          return false;
          tickCount--;

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
  var enumerator = enumerable[getEnumerator]();
  
  var result = [];
  while (enumerator[moveNext]())
    result.push(enumerator[current]);

  assert(result.length == 3);
  assert(result[0] < result[1]);
  assert(result[1] < result[2]);
}
readme();

function lifeCycle() {
  var moveNextActivationCounter = 0;
  var moveNextCounter = 0;

  var value = { };
  var sequence = defineEnumerator(function() {
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

  var enumerator = enumerable[getEnumerator]();
  assert(moveNextActivationCounter == 0);
  assert(moveNextCounter == 0);

  assert(enumerator[moveNext]());
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 1);
  assert(enumerator[current] == value);

  assert(enumerator[moveNext]() == false);
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);
  assert(enumerator[current] === undefined);

  assert(enumerator[moveNext]() == false);
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);
  assert(enumerator[current] === undefined);


  enumerator = enumerable[getEnumerator]();
  assert(moveNextActivationCounter == 1);
  assert(moveNextCounter == 2);

  assert(enumerator[moveNext]());
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 3);
  assert(enumerator[current] == value);

  assert(enumerator[moveNext]() == false);
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 4);
  assert(enumerator[current] === undefined);

  assert(enumerator[moveNext]() == false);
  assert(moveNextActivationCounter == 2);
  assert(moveNextCounter == 4);
  assert(enumerator[current] === undefined);
}
lifeCycle();

function justThis() {
  var generateThis = defineEnumerator(
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
  var enumerator = justThis[getEnumerator]();
  assert(enumerator[moveNext]());
  assert(enumerator[current] == helloWorld);
  assert(!enumerator[moveNext]());
  assert(enumerator[current] === undefined);
  assert(!enumerator[moveNext]());
  assert(enumerator[current] === undefined);
}
justThis();