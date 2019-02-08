var assert = require('assert');
var exportExtension = require('..');
var IIterable = require('@kingjs/i-iterable');

// Assume the package is `@kingjs/ex` with version `1.0.0`.
var name = 'Symbol(@kingjs/ex, 1.0.0)';

/**
 * Export an extension `Rename` on Function that renames the
 * Function.  
 */
var Rename = exportExtension(
  module,
  Function,
  function(name) {
    Object.defineProperty(
      this, 'name', { value: name }
    )
  }
)
assert(module.exports == Rename);
assert(Rename.toString() == name);
//assert(Function.prototype[Rename].name == name);

function foo() { }
foo[Rename]('bar');
assert(foo.name == 'bar');

/**
 * Export an extension `Rename` on Function that renames the
 * Function, but this time as an accessor. Looks weird but 
 * illustrates using an accessor.
 */
var Rename = exportExtension(
  module,
  Function, {
    set: function(name) {
      Object.defineProperty(
        this, 'name', { value: name }
      )
    }
  }
)
function foo() { }
foo[Rename] = 'bar';
assert(foo.name == 'bar');

/**
 * Export an extension on Any() IIterable which is an Interface
 * implemented by all types with a Symbol.iterator property.
 */
var Any = exportExtension(
  module,
  IIterable,
  function() {
    var iterator = this[Symbol.iterator]();
    iterator = iterator.next();
    return !iterator.done;
  }
)

// string implements IIterable
assert(''[Any]() == false)
assert('foo'[Any]() == true)

// array implements IIterable
assert([][Any]() == false)
assert([ 0 ][Any]() == true)

/**
 * If the `kingjs` shim has been run, then String and Array
 * also implement IEnumerable which allows for extending
 * IEnumerable to implement `None` like this:
 */
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');
var None = exportExtension(
  module,
  IEnumerable,
  function() {
    var enumerator = this[IEnumerable.getEnumerator]();
    return !enumerator[IEnumerator.moveNext]();
  }
)

require('kingjs');
require('@kingjs/assert-shimmed');

// string implements IEnumerable when shimmed
assert(''[None]() == true)
assert('foo'[None]() == false)

// array implements IEnumerable when shimmed
assert([][None]() == true)
assert([ 0 ][None]() == false)
