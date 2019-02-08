var assert = require('assert');
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');
var implementIEnumerable = require('..');

var target = implementIEnumerable(
  [ 0 ], 
  function moveNextFactory(instance) {
    var i = -1;

    return function moveNext() {
      if (i + 1 == instance.length)
        return false;
      this.current_ = instance[++i]
      return true;
    }
  }
)

var enumerator = target[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 0);
assert(!enumerator[IEnumerator.moveNext]());