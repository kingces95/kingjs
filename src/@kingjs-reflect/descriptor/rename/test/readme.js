var assert = require('assert');
var rename = require('..');

var foo = {
  value: function foo() { }
}
foo = rename.call(foo, '${name} (thunk)');
assert(foo.value.name == 'foo (thunk)');

var bar = {
  get: function getBar() { }, 
  set: function setBar(value) { }
}
bar = rename.call(bar, '${name} (stub)');
assert(bar.get.name == 'getBar (stub)');
assert(bar.set.name == 'setBar (stub)');
