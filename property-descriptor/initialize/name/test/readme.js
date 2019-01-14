var assert = require('assert');
var name = require('..');

var foo = {
  value: function() { }
}
foo = name.call(foo, 'Foo', 'thunk');
assert(foo.value.name == 'Foo (thunk)');

var bar = {
  get: function() { }, 
  set: function(value) { }
}
bar = name.call(bar, 'Bar', 'stub');
assert(bar.get.name == 'Bar (stub)');
assert(bar.set.name == 'Bar (stub)');
