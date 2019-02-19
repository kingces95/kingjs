var assert = require('assert');
var defineExtension = require('..');

var Rename = defineExtension(
  Function.prototype,
  '@kingjs/function-ex.rename',
  '1.0.0',
  function(name) {
    Object.defineProperty(
      this, 'name', { value: name }
    )
  }
)
assert(Rename.toString() == 'Symbol(@kingjs/function-ex.rename, 1.0.0)');

function foo() { }
foo[Rename]('bar');
assert(foo.name == 'bar');
