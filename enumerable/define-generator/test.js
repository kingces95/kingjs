'use strict';

var assert = require('@kingjs/assert');
var defineGenerator = require('./index');

function readme() {

  var sequence = defineGenerator(
    function moveNextFactory() {
      var array = arguments;
      var index = -1;
      return function moveNext() {
        if (index + 1 == array.length)
          return false;
        this.current_ = array[++index];
        return true;
      }
    }
  );
  
  var enumerable = sequence(0, 1, 2);
  var enumerator = enumerable.getEnumerator();
  
  var actual = [];
  while (enumerator.moveNext())
    actual.push(enumerator.current);

  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify([0, 1, 2]);

  assert(actualJSON == expectedJSON);
}
readme();

function justThis() {
  var generateThis = defineGenerator(
    function moveNextFactory() {
      var thisArg = this;
      var done = false;
      return function moveNext() {
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